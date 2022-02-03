import {
  Box, Flex, Heading, Spacer, IconButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HamburgerIcon, ChatIcon } from '@chakra-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { Header } from '../header';
import EventList from './eventList';
import { auth } from '../firebase';

const Events = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [listStyle, setListStyle] = useState('block');
  const { state } = useLocation();
  const [title, setTitle] = useState('');

  const getEventData = (user_id) => {
    axios.get(`/api/events/user/${user_id}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    if (state) {
      setTitle(`${state.name}'s Events`);
      getEventData(state.user_id);
    } else if (user) {
      setTitle('My Events');
      getEventData(user.email);
    }
  }, [state, user]);

  return (
    <Box>
      <Header />
      <Box p={4} m={4}>
        <Flex>
          <Heading size="lg" mb={4} fontSize="5vh">{title}</Heading>
          <Spacer />
          <Box>
            <IconButton onClick={() => { setListStyle('list'); }} variant="outline" icon={<HamburgerIcon />} mr={3} />
            <IconButton onClick={() => { setListStyle('block'); }} variant="outline" icon={<ChatIcon />} />
          </Box>
        </Flex>
        <EventList events={events} listStyle={listStyle} />
      </Box>
    </Box>
  );
};

export default Events;
