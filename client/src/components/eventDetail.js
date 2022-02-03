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
import { MdAddBox, MdOutlineGroupAdd } from "react-icons/md";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetail = ({ userId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const address = `${event.address_line_1} ${event.address_state} ${event.address_zip}`;
  const currentUser_id = 1;
  const [reserved, isReserved] = useState(false);

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
          navigate("/events", { event_id: params.eventId });
        }
      });
    }
  }, []);

  const ReserveEvent = (e) => {
    e.preventDefault();
    axios.post("/api/events/users", {
      user_id: currentUser_id,
      event_id: params.eventId,
    });
    isReserved(true);
  };

  return (
    <Box>
      <Header />
      <Box pl="10em" pr="6em" pd="2em">
        <HStack spacing="80px">
          <VStack align="left" w="500px" spacing="60px">
            <Image
              bg="tomato"
              boxSize="500px"
              objectFit="cover"
              align="center"
              src={event.mainphoto}
              alt="event image"
            />
            <Box pt="2em">
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
              <Heading size="lg"> About this event:</Heading>
              <Text pt="1em" pb="1em">
                {event.description}
              </Text>
            </Box>
          </VStack>

          <VStack align="left" w="500px" spacing="80px" pt="5em">
            <Box pb="5em">
              <Heading pb="2em">{event.title}</Heading>
              <VStack align="left" spacing="4" pb="5em">
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
              <HStack>
                {!reserved ? (
                  <Button
                    h="50px"
                    w="30%"
                    borderTopRadius="md"
                    align="center"
                    size="lg"
                    _hover={{
                      background: "white",
                      color: "#EC7C71",
                    }}
                    bg="#E3444B"
                    fontWeight="bold"
                    color="white"
                    variant="solid"
                    onClick={(e) => {
                      ReserveEvent(e);
                    }}
                  >
                    {" "}
                    RSVP Now <Icon as={MdAddBox} w={6} h={6} pl="2px" />
                  </Button>
                ) : (
                  <Text
                    h="50px"
                    w="30%"
                    pt="5px"
                    align="center"
                    fontSize="25px"
                    fontWeight="bold"
                    bg="#EC7C71"
                    color="white"
                    borderRadius="md"
                  >
                    {" "}
                    Thank You!
                  </Text>
                )}
                <Button
                  h="50px"
                  w="30%"
                  borderTopRadius="md"
                  align="center"
                  size="lg"
                  _hover={{
                    background: "white",
                    color: "#EC7C71",
                  }}
                  bg="#E3444B"
                  fontWeight="bold"
                  color="white"
                  variant="solid"
                  onClick={() => {
                    navigate("/friends", {
                      state: { event_id: event.id },
                    });
                  }}
                >
                  Add Friends{" "}
                  <Icon as={MdOutlineGroupAdd} w={6} h={6} pl="2px" />
                </Button>
              </HStack>
            </Box>
            {address !== "null null null" ? (
              <VStack pt="5em" spacing="30px" align="left" pb="2em">
                <Box>
                  <Heading size="lg">Location:</Heading>
                  <Text pt="1em" pb="1em">
                    {address}
                  </Text>
                </Box>
                <Map address={address} />
              </VStack>
            ) : (
              <VStack pt="5em" spacing="30px" align="left" pb="2em">
                <Box>
                  <Heading size="lg">Location:</Heading>
                  <Text pb="35em" pt="1em">
                    Online Only
                  </Text>
                </Box>
              </VStack>
            )}
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default EventDetail;
