import { Box, Grid, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Header } from './header';
import eventData from '../../../eventData.js';
import Map from './map';

const EventDetail = () => {
  const [event, setEvent] = useState(eventData);
  const address = `${eventData.address_line1} ${eventData.address_city} ${eventData.address_state} ${eventData.address_zip}`;

  return (
    <Box>
      <Header />
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading>Event Detail</Heading>
    </Flex>
    <h2> {eventData.title} </h2>
    <Map address={address} />
  </Box>
  );
};

export default EventDetail;