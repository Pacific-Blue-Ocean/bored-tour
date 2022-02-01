import {
  Box,
  Grid,
  GridItem,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Icon,
  Spacer,
  extendTheme, ChakraProvider
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Header } from "./header";
import eventData from "../../../eventData.js";
import Map from "./map";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import moment from 'moment';

const EventDetail = ({ event_id }) => {
  const [event, setEvent] = useState(eventData);
  const address = `${eventData.address_line1} ${eventData.address_state} ${eventData.address_zip}`;

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
      <Box pl="5em" pr="5em" pt="2em">
        <Box>
          <Flex>
            <Image
              boxSize="400px"
              objectFit="cover"
              align="center"
              src={eventData.mainPhoto}
              alt="event image"
            />
            <Spacer />
            <Heading as="h3" size="md">
              {" "}
              {eventData.title}{" "}
            </Heading>
          </Flex>
        </Box>
        <Box>{eventData.price}</Box>
        <Flex>
          <Box>
            <Icon as={MdFavoriteBorder} w={8} h={8} />
          </Box>
          <Spacer />
          <Button
            borderTopRadius="md"
            align="center"
            size="lg"
            colorScheme="teal"
            variant="solid"
          >
            {" "}
            RSVP Now{" "}
          </Button>
        </Flex>
        <Box>
          <Text>{eventData.details}</Text>
        </Box>
        <Heading>Time:</Heading>
        <Text>
          {moment(eventData.date).format('MMMM Do YYYY')}, {eventData.start_time}
        </Text>
        <Heading>Duration:</Heading>
        <Text>{eventData.event_length_minutes}min</Text>
        <Heading>About the event:</Heading>
        <Text>{eventData.description}</Text>
      <Box>
        <Heading>Location:</Heading>
        <Text>{address}</Text>
      </Box>
      <Map address={address} />
    </Box>
      </Box>
  );
};

export default EventDetail;

{
  /* <Grid
    pl='5em'
    pr='5em'
    pt='2em'
    templateRows='repeat(4, 1fr)'
    templateColumns='repeat(2, 1fr)'
    gap={5}>
<GridItem row={1} column={1} bg='red.300' align='center'>
<Image boxSize='400px'
  objectFit='cover' align='center' src={eventData.mainPhoto} alt='event image' />
</GridItem>

<GridItem row={1} column={2} colSpan={1}>
<Heading as='h3' size='md'> {eventData.title} </Heading>
<Box>{eventData.price}</Box>
</GridItem>
<GridItem w="100%" h="20px" row={2} column={1}>
  <Box h='20px'>
  <Icon as={MdFavoriteBorder} />
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
</Grid> */
}
