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
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const EventDetail = ({ userId }) => {
  const [user, loading, error] = useAuthState(auth);
  const params = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [reserved, isReserved] = useState(false);
  const address = `${event.address_line_1} ${event.address_state} ${event.address_zip}`;

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
    if (user) {
      axios.post('/api/events/users', { user_id: user.email, event_id: params.eventId });
      isReserved(true);
    }
  };

  return (
    <Box>
      <Header />
      <Flex flexDirection="column" margin="0" w={{base: "100vw"}}>
        <Flex
          flexDirection={{ base: "column", md: "row"}}
          w={{base: "100%", md: "100%"}}
          justifyContent="space-around"
          marginTop="5vw"
          marginLeft="5vw"
        >
          <Image
            bg="tomato"
            w={{base: "72%", md: "50%"}}
            h="30vw"
            objectFit="cover"
            borderRadius='5%'
            align="center"
            src={event.mainphoto}
            alt="event image"
          />
          <Flex flexDirection="column" w={{base: "100%", md: "40%"}} justifyContent="space-evenly">
            <Flex flexDirection="column" marginBottom={{base: "0vw", md: "0"}}>
              <Heading fontSize={{base: "4vw", md: "3vw"}} marginBottom={{base: "2vw", md: "0"}}>{event.title}</Heading>
              <Box fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "2vw", md: "0"}}>
                <Text fontWeight="bold" display="inline-block" marginBottom={{base: "2vw", md: "0"}}>
                  Price:{" "}
                </Text>
                {event.price ? ` $${event.price}` : " Free"}
              </Box>
              <Box fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "2vw", md: "0"}}>
                <Text fontWeight="bold" display="inline-block" marginBottom={{base: "2vw", md: "0"}}>
                  Time:{" "}
                </Text>
                  {` ${moment(event.date).format("MMMM Do YYYY")}, ${event.start_time}`}
              </Box>
              <Box fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "2vw", md: "0"}}>
                <Text fontWeight="bold" display="inline-block" marginBottom={{base: "2vw", md: "0"}}>
                  {`Duration: `}
                </Text>
                {event.event_length_minutes ? ` ${event.event_length_minutes} min` : " TBA"}
              </Box>
              <Box fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "2vw", md: "0"}}>
                <Text fontWeight="bold" display="inline-block" marginBottom={{base: "2vw", md: "0"}}>
                  Type:{" "}
                </Text>
                {event.digital ? " Digital" : " In Person"}
              </Box>
            </Flex>
            <Flex flexDirection="row" w={{base: "50%", md:"60%"}} justifyContent="space-between">
                {!reserved ? (
                  <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  fontSize={{base: "2.5vw", md: "1vw"}}
                  textStyle="button"
                  _hover={{
                    background: "white",
                    color: "brand.400",
                  }}
                  fontWeight="bold"
                  variant="solid"
                  onClick={(e) => {
                    ReserveEvent(e);
                  }}
                  >
                    {" "}
                    RSVP Now <Icon as={MdAddBox} w={6} h={6} pl="2px" />
                  </Button>
                ) : (
                  <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  fontSize={{base: "2.5vw", md: "1vw"}}
                  textStyle="button"
                  _hover={{
                    background: "white",
                    color: "brand.400",
                  }}
                  fontWeight="bold"
                  variant="solid"
                  >
                    {" "}
                    Thank You!
                  </Button>
                )}
                <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  fontSize={{base: "2.5vw", md: "1vw"}}
                  textStyle="button"
                  _hover={{
                    background: "white",
                    color: "brand.400",
                  }}
                  fontWeight="bold"
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
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection={{ base: "column", md: "row"}}
          w="100%"
          h="45vw"
          justifyContent="space-around"
          marginTop={{base: "15vw", md: "5vw"}}
          marginLeft="5vw"
          marginRight="5vw"
        >
          <Flex flexDirection="column" w="45%" alignContent="flex-start" h="45vw" marginLeft={{ base: "0", md: "2.5vw"}} marginTop={{base: "20vw", md: "1.5vw"}}>
            <Heading size="lg" fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "1vw", md: "1vw"}}>Detail:</Heading>
            <Text fontSize={{base: "3vw", md: "1.5vw"}} marginBottom="3vw" marginBottom={{base: "2vw", md: "4vw"}}  marginBottom={{base: "2vw", md: "0"}}>
              {event.details}
            </Text>
            <Heading size="lg" fontSize={{base: "3vw", md: "1.5vw"}} marginTop={{base: "0.5", md: "1vw"}} marginBottom={{base: "2vw", md: "1vw"}}> About this event:</Heading>
            <Text fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "2vw", md: "4vw"}}  >
              {event.description}
            </Text>
          </Flex>
          <Flex flexDirection="column" w="40%" h="45vw" justifyContent="flex-start" marginRight="5vw" marginTop="1.5vw">
            <Heading size="lg" fontSize={{base: "3vw", md: "1.5vw"}} marginBottom={{base: "2vw", md: "0"}}>Location:</Heading>
            {address !== "null null null" ? (
              <div>
                <Text fontSize={{base: "3vw", md: "1.5vw"}} marginBottom="3vw">
                  {address}
                </Text>
                <Map address={address} />
              </div>
                ) : (
              <div>
              <Text fontSize={{base: "3vw", md: "1.5vw"}} marginBottom="3vw">
                Online Only
              </Text>
              </div>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventDetail;
