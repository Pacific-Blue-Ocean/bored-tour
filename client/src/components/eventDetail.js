import {
  Box,
  Stack,
  HStack,
  VStack,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Icon,
  Spacer,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Header } from "./header";
import Map from "./map";
import { MdOutlineIosShare } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetail = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const address = `${event.address_line_1} ${event.address_state} ${event.address_zip}`;

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30", //black {header}
        200: "#8DD8E0", //blue {border color}
        300: "#E3444B", //red  {buttons}
        400: "#EC7C71", //orange {button border}
        500: "#FBFAFA", //white {subheaders, text}
      },
    },
  });

  useEffect(() => {
    if (params.eventId) {
      axios.get(`/api/events/${params.eventId}`).then((res) => {
        if (res.data[0]) {
          setEvent(res.data[0]);
        } else {
          navigate("/events");
        }
      });
    }
  }, []);

  return (
    <Box>
      <Header />
      <Box pl="8em" pr="8em" pt="2em">

          <HStack spacing="80px">
            <Image
              boxSize="500px"
              objectFit="cover"
              align="center"
              src={event.mainphoto}
              alt="event image"
            />
            <VStack align="left" spacing="80px" w="50%">
              <Heading>{event.title}</Heading>
              <VStack align="left" spacing="4">
                <Box>
                  <Text fontWeight="bold" display="inline-block">
                    Price:{" "}
                  </Text>
                  {event.price ? ` $${event.price}` : " Free"}
                </Box>
                <Box>
                  <Text fontWeight="bold" display="inline-block">
                    Type:{" "}
                  </Text>
                  {event.digital ? " Digital" : " In Person"}
                </Box>
              </VStack>
              <HStack >
                <Button
                  h="50px"
                  w="50%"
                  borderTopRadius="md"
                  align="center"
                  size="lg"
                  bg="#EC7C71"
                  fontWeight="bold"
                  color="white"
                  variant="solid"
                >
                  {" "}
                  RSVP Now <Icon as={MdOutlineIosShare} w={6} h={6} pl="2px" />
                </Button>

                <Button
                  w="10%"
                  h="50px"
                  border="none"
                  bg="#EC7C71"
                  color="white"
                >
                  <Icon as={MdFavoriteBorder} w={8} h={8} />
                </Button>
              </HStack>
            </VStack>
          </HStack>


        <HStack align="left" spacing="80px" pt="6em" pb="5em">
          <VStack align="left" w="500px" spacing="30px">
            <Box>
              <Heading size="lg">Detail:</Heading>
              <Text pt="1em" pb="1em">
                {event.details}
              </Text>
            </Box>
            <Box>
              <Heading size="lg">Time:</Heading>
              <Text pt="1em" pb="1em">
                {moment(event.date).format("MMMM Do YYYY")}, {event.start_time}
              </Text>
            </Box>
            <Box>
              <Heading size="lg">Duration:</Heading>
              <Text pt="1em" pb="1em">
                {event.event_length_minutes}min
              </Text>
            </Box>
            <Box>
              <Heading size="lg">About this event:</Heading>
              <Text pt="1em" pb="1em">
                {event.description}
              </Text>
            </Box>
          </VStack>
          <VStack align="left" w="50%" spacing="20px">
            <Box>
              <Heading size="lg">Location:</Heading>
              <Text pt="1em" pb="1em">
                {address}
              </Text>
            </Box>
            <Map address={address} />
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default EventDetail;
