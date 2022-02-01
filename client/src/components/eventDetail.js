import { Box, Grid, GridItem, Flex, Heading, Image, Text, Button, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Header } from './header';
import eventData from '../../../eventData.js';
import Map from './map';

const EventDetail = () => {
  const [event, setEvent] = useState(eventData);
  const address = `${eventData.address_line1} ${eventData.address_city} ${eventData.address_state} ${eventData.address_zip}`;

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


  return (
    <Box>
      <Header />
  <Grid
      pl='5em'
      pr='5em'
      pt='2em'
      h='auto'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={5}>
  <GridItem row={1} column={1} bg='red.300' align='center'>
  <Image boxSize='400px'
    objectFit='cover' src={eventData.mainPhoto} alt='event image' />
  </GridItem>

  <GridItem row={1} column={2} colSpan={1}>
  <Heading as='h3' size='md'> {eventData.title} </Heading>
  <Box>{eventData.price}</Box>
  </GridItem>
  <GridItem w="100%" h="20px" row={2} column={1}>
    <Box h='20px'>
      <Text>Fave</Text>
    </Box>
  </GridItem>

  <GridItem w="100%" height='10px' row={2} column={2} align='center'>
    <Box h='20px'>

  <Button borderTopRadius="md" align='center' size='lg' colorScheme='teal' variant='solid'> RSVP Now </Button>
    </Box>
  </GridItem>

  <GridItem rowSpan={3} column={1}>
    <Box>
    <Text>{eventData.details}</Text>
    </Box>
    <Heading>Time:</Heading>
    <Text>{eventData.date} {eventData.start_time}</Text>
    <Heading>Duration:</Heading>
    <Text>{eventData.event_length_minutes}min</Text>
    <Heading>About the event:</Heading>
    <Text>{eventData.description}</Text>
  </GridItem>

  <GridItem row={3} column={2}>
    <Box>
    <Heading>Location:</Heading>
    <Text>{address}</Text>
    </Box>
  </GridItem>
  <GridItem row={4} column={2}>
  <Map address={address} />
  </GridItem>
</Grid>
  </Box>
  );
};

export default EventDetail;
