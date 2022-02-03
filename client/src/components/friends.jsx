import {
  Box, Flex, Heading, Input,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './header';
import Friend from './friends/friend.jsx';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Friends() {
  const [user, loading, error] = useAuthState(auth);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [event_id, setEventId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const { state } = useLocation();

  // fetch the user's friends
  useEffect(() => {
    if (user) {
      axios.get('/api/friends', { params: { id: user.email } })
        .then((res) => {
          setFriends(res.data);
          setFilteredFriends(res.data);
        });
      }
  }, [user]);

  // search for friends
  useEffect(() => {
    let filteredFriends = friends.filter(friend => {
      const friendName = friend.full_name.toLowerCase();
      return friendName.includes(searchText.toLowerCase());
    });
    setFilteredFriends(filteredFriends);
  }, [searchText]);

  useEffect(() => {
    if (state !== null) {
      setEventId(state.event_id)
    }
  }, [state])

  const handleChange = (e) => { setSearchText(e.target.value); };

  return (
    <Box backgroundColor="brand.500">
      <Header />
      <Flex p={4} m={4} flexDirection="column" backgroundColor="brand.500">
        <Heading fontSize="5vh">Friends</Heading>
        <Flex p={4} m={8} flexDirection="row">
          <Input type="text" focusBorderColor="brand.400" placeholder="Search for a user" value={searchText} fontSize="3vh" onChange={handleChange} />
        </Flex>
        <Flex p={4} m={4} flexDirection="row" flexWrap="wrap">
          {filteredFriends.length ? filteredFriends.map((friend) => (
            <Friend
              key={friend.id}
              user_id={user.email}
              friend={friend}
              event_id={event_id}
            />
          )) : <span>No users found</span>}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Friends;
