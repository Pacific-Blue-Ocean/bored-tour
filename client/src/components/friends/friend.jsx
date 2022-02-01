import { Flex, Button, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';

const theme = extendTheme({
  colors: {
    brand: {
      100: "#2E2F30",  //black {header}
      200: "#8DD8E0",  //blue {border color}
      300: "#E3444B",  //red  {buttons}
      400: "#EC7C71",  //orange {button border}
      500: "#FBFAFA",  //white {subheaders, text}
    },
  },
})

function Friend({ user_id, friend, event_id }) {
  const [isFriend, setIsFriend] = useState(friend.friend);
  // TODO: Read from db if user is invited to event
  const [isInvited, setIsInvited] = useState(false);

  const handleFriendClick = (e) => {
    const request = e.target.value;
    const body = {
      user_id,
      friend_id: parseInt(friend.id, 10),
    };

    if (request === 'add') {
      axios.post('/api/friends', body);
    } else if (request === 'remove') {
      axios.delete('/api/friends/', { data: body });
    }
    setIsFriend(!isFriend);
  };

  const handleInvite = (e) => {
    const body = {
      event_id,
      friend_id: parseInt(friend.id, 10),
    };
    // TODO: Call api route to add user to event
    setIsInvited(true);
  };

  // Conditionally render invitation based on event, invitation, friend status
  let inviteButton;
  if (event_id && !isInvited && isFriend) {
    inviteButton = (
      <Button m={2} onClick={handleInvite} value="invite">
        ✉️ &nbsp; Invite to Event
      </Button>
    );
  } else if (event_id && isInvited && isFriend) {
    inviteButton = (
      <Button m={2} onClick={handleInvite} value="invite">
        ✅ &nbsp; Invitation Sent!
      </Button>
    );
  } else {
    inviteButton = null;
  }

  return (
    <Flex
      flexDirection="column"
      p={4}
      m={4}
      border="1px"
      borderRadius="10px"
      borderColor="#8F8F8F"
    >
      {friend.full_name}
      <br />
      {friend.location}
      <br />

      {isFriend ? (
        <Button m={2} onClick={handleFriendClick} value="remove">
          ❌ &nbsp; Remove Friend
        </Button>
      ) : (
        <Button m={2} onClick={handleFriendClick} value="add">
          ➕ &nbsp; Add Friend
        </Button>
      )}

      { inviteButton }
    </Flex>
  );
}

export default Friend;
