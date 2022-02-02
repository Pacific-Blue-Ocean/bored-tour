import { Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import pepe from '../../../public/images/PepeProfile.jpeg';


function Friend({ user_id, friend, event_id }) {
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(friend.friend);
  const [isInvited, setIsInvited] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    axios.get(`/api/events/users/${event_id}`)
      .then((res) => {
        res.data.forEach((user) => {
          if (user.user_id === friend.id) { setIsInvited(true); }
        });
      });
  }, [friend, event_id]);

  useEffect(() => {
    const navigateHome = () => navigate('/');
    if (error) return <img src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1" alt="Error" />;
    if (loading) return <img src="https://images.wondershare.com/mockitt/ux-beginner/loading-time-tips.jpeg" alt="Loading" />;
    if (!user) navigateHome();
  }, [user, loading]);

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
      <Button m={2} onClick={handleInvite} value="invite" fontSize="2vh">
        ✉️ &nbsp; Invite to Event
      </Button>
    );
  } else if (event_id && isInvited && isFriend) {
    inviteButton = (
      <Button m={2} onClick={handleInvite} value="uninvite" fontSize="2vh">
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
      backgroundColor="white"
      borderRadius="10px"
      fontSize="2.5vh"
    >
      <img className="pepe" src={pepe}/>
      {friend.full_name}
      <br />
      {friend.location}
      <br />

      {isFriend ? (
        <Button m={2} onClick={handleFriendClick} value="remove" fontSize="2vh">
          ❌ &nbsp; Remove Friend
        </Button>
      ) : (
        <Button m={2} onClick={handleFriendClick} value="add" fontSize="2vh">
          ➕ &nbsp; Add Friend
        </Button>
      )}

      {isFriend ? (
        <Button m={2} onClick={handleFriendEvents} fontSize="2vh">
          🎉 &nbsp; Friend&apos;s Events
        </Button>
      ) : null}

      { inviteButton }
    </Flex>
  );
}

export default Friend;
