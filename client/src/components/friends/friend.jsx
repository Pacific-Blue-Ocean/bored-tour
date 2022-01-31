import { Flex, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';

function Friend({ user_id, friend, event_id }) {
  const [isFriend, setIsFriend] = useState(friend.friend);

  // TODO: Check read from db if user is invited to event
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

    console.log(body);

    axios.post('/api/events/invite', body);
    setIsInvited(true);
  };

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
      {event_id && !isInvited && isFriend ? (
        <Button m={2} onClick={handleInvite} value="invite">
          ✉️ Invite to Event
        </Button>
      ) : null}
    </Flex>
  );
}

export default Friend;
