import { Box, Button, Flex, Heading, Spacer, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Header } from '../header';
import EventList from './eventList';
import axios from 'axios';
import {HamburgerIcon, ChatIcon, MinusIcon} from '@chakra-ui/icons';

const Events = () => {

  let [events, setEvents] = useState([]);
  let [listStyle, setListStyle] = useState('block');

  useEffect(() => {
    axios.get('/api/events', { params: {
      limit: 10,
      page: 0
      }
    })
    .then((response) => {
      console.log(response.data);
      setEvents(response.data);
    })
    .catch((err) => {console.log(err)});
  },[])

  return (
  <Box>
    <Header />
    <Box p={4} m={4}>
    <Flex>
    <Heading size='lg' mb={4}>Upcoming Events</Heading>
    <Spacer />
    <Box>
      <IconButton onClick={() => {setListStyle('list')}} variant='outline' icon={<HamburgerIcon />} mr={3}></IconButton>
      {/* <IconButton onClick={() => {setListStyle('map')}} variant='outline' icon={<MinusIcon />} mr={3}></IconButton> */}
      <IconButton onClick={() => {setListStyle('block')}} variant='outline' icon={<ChatIcon />}></IconButton>
    </Box>
    </Flex>
    <EventList events={events} listStyle={listStyle} />
    </Box>
  </Box>
  )
}

export default Events;