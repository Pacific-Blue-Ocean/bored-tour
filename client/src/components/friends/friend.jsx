import { Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Friend({ user_id, friend, event_id }) {
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(friend.friend);
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    axios.get(`/api/events/users/${event_id}`)
      .then((res) => {
        res.data.forEach((user) => {
          if (user.user_id === friend.id) { setIsInvited(true); }
        });
      });
  }, [friend, event_id]);

  /*******************************
  * BUTTON HANDLERS
  *******************************/
  const handleFriendClick = (e) => {
    const request = e.target.value;
    const body = { user_id, friend_id: parseInt(friend.id, 10) };
    if (request === 'add') {
      axios.post('/api/friends', body);
    } else if (request === 'remove') {
      axios.delete('/api/friends', { data: body });
    }
    setIsFriend(!isFriend);
  };

  const handleFriendEvents = (e) => {
    console.log(`Show events for user_id: ${friend.id}`);
    navigate({ pathname: '/events', user_id: `${friend.id}` });
  };

  const handleInvite = (e) => {
    const request = e.target.value;
    const body = { event_id, user_id: parseInt(friend.id, 10), };
    if (request === 'invite') {
      axios.post('/api/events/users', body);
    } else if (request === 'uninvite') {
      axios.delete('/api/events/users', { data: body });
    }
    setIsInvited(!isInvited);
  };

  /*******************************
  * INVITATION BUTTON
  *******************************/
  let inviteButton;
  if (event_id && !isInvited && isFriend) {
    inviteButton = (
      <Button m={2} onClick={handleInvite} value="invite">
        ✉️ &nbsp; Invite to Event
      </Button>
    );
  } else if (event_id && isInvited && isFriend) {
    inviteButton = (
      <Button m={2} onClick={handleInvite} value="uninvite">
        👋 &nbsp; Uninvite to Event
      </Button>
    );
  } else {
    inviteButton = null;
  }

  /*******************************
  * RENDER
  *******************************/
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

      {isFriend ? (
        <Button m={2} onClick={handleFriendEvents}>
          🎉 &nbsp; Friend&apos;s Events
        </Button>
      ) : null}

      { inviteButton }
    </Flex>
  );
}

export default Friend;
