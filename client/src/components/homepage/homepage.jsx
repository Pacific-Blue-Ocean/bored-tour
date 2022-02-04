import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Flex,
  Heading,
  Box,
  IconButton,
  Stack,
  Select,
  HStack,
  Icon,
  SimpleGrid
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import React, { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import axios from "axios";
import Event from "./event.jsx";
import moment from "moment";
import { MdSettingsBackupRestore } from "react-icons/md";

const HomePage = ({ reset, setReset, events, setEvents, searchEvent, categoriesList }) => {

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);


  const [startDate, setStartDate] = useState(new Date());
  const [label, setLabel] = useState("");
  const [initial, setInitial] = useState(true);
  const [duration, setDuration] = useState("");


  useEffect(() => {
    if (searchEvent.length > 0) {
      setEvents(searchEvent);
    }
  }, [searchEvent]);

  useEffect(() => {
    setEvents(
      label.length === 0
        ? events
        : events.filter((event) => {
            return (
              event.categories
                .sort()
                .toString()
                .replaceAll(" ", "")
                .replaceAll(",", "")
                .indexOf(
                  label
                    .sort()
                    .toString()
                    .replaceAll(" ", "")
                    .replaceAll(",", "")
                ) !== -1
            );
          })
    );
  }, [label]);

  const handleClick = (event) => {
    event.preventDefault();
    setInitial(false);
    if (label.indexOf(event.target.name) === -1) {
      setLabel([...label, event.target.name].sort());
    }
  };

  const handleReset = () => {
    setLabel("");
    setReset(!reset);
    setStartDate(new Date());
  };

  const searchEventsTime = () => {
    const newDuration = duration.substring(0, duration.length - 5);
    const newDate = moment(startDate).format().slice(0, 10);
    const newEvents = events.filter(
      (event, idx) =>
        event.event_length_minutes == newDuration &&
        event.date.slice(0, 10) == newDate
    );
    setEvents(newEvents);
  };

  return (
    <Flex flexDirection="column">
      <Flex
        marginTop="2vw"
        marginBottom="0"
        flexDirection={{base: "column", md: "row"}}
        justifyContent={{base: "center", md: "space-evenly"}}
      >
        <Flex
          flexDirection="row"
          marginLeft={{base: "0", md: "2vw"}}
          justifyContent={{base: "space-evenly", md: "space-around"}}
        >
          <DatePicker
            className="calendar"
            closeOnScroll={true}
            selected={startDate}
            textStyle="button"
            onChange={(date) => {
              setStartDate(date);
            }}
            type="submit"
          />
          <Stack spacing={3}>
            <Select
              display={{base: "none"}}
              variant="outline"
              focusBorderColor="brand.400"
              placeholder="Duration"
              backgroundColor="brand.400"
              color="brand.500"
              size="lg"
              textStyle="button"
              fontSize="1vw"
              w="8vw"
              h={{base: "5vw", md: "3vw"}}
              textStyle="button"
              textAlign="center"
              _selection={{
                backgroundColor: "brand.400",
                color: "brand.500",
              }}
              onChange={(e) => setDuration(e.target.value)}
            >
              {events
                .map((event, idx) => event.event_length_minutes)
                .filter((item, i, arr) => arr.indexOf(item) === i)
                .sort((a, b) => a - b)
                .map((duration, idx) => (
                  <option>{duration} mins</option>
                ))}
            </Select>
          </Stack>
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            backgroundColor="brand.500"
            color="brand.400"
            size="lg"
            h={{base: "5vw", md: "3vw"}}
            textStyle="button"
            fontSize="1vw"
            _hover={{
              backgroundColor: "brand.400",
              color: "brand.500",
            }}
            onClick={(e) => {
              searchEventsTime();
            }}
          />
        </Flex>
        <Flex
          flexDirection="row"
          w={{base: "90vw", md: "50vw"}}
          alignItems="center"
          justifyContent="space-around"
          marginRight={{base: "0", md: "2vw"}}
          marginLeft={{base: "5vw", md: "0"}}
        >
          <ChevronLeftIcon
            ref={slideLeft}
            w={8}
            h={8}
            color="black.500"
            cursor="pointer"
            onClick={() => {
              categories.current.scrollBy(-500, 0);
            }}
          />
          <Box w="90%" overflowX="hidden" ref={categories}>
            <ButtonGroup spacing={6} direction="row" align="center">
              {categoriesList.map((category, idx) => (
                <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  textStyle="button"
                  fontSize={{base: "3vw", md: "1vw"}}
                  h={{base: "5vw", md: "3vw"}}
                  key={idx}
                  name={category.label}
                  onClick={(e) => handleClick(e)}
                >
                  {category.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          <ChevronRightIcon
            ref={slideRight}
            w={8}
            h={8}
            color="black.500"
            cursor="pointer"
            onClick={() => {
              categories.current.scrollBy(500, 0);
            }}
          />
        </Flex>
      </Flex>
      <Heading
        fontSize={{base: "3vh", md: "5vh"}}
        marginLeft="5vw"
        marginTop="2vw"
        marginBottom="1vw"
      >
        Popular near you...
      </Heading>
      <Box pl="5em">
        <HStack spacing="5" marginBottom={{base: "1vw", md: "2.5vh"}}>
          <Box fontWeight="bold" fontSize={{base: "5vw", md: "1vw"}}>
            Filter by:{" "}
            <Box display="inline-block" fontSize={{base: "5vw", md: "1vw"}}>
              {label.length > 0 ? `${label}` : "All"}
            </Box>
          </Box>
          <Button onClick={handleReset}>
            Reset <Icon as={MdSettingsBackupRestore} w={4} h={4} pl="2px" />
          </Button>
        </HStack>
        <SimpleGrid columns={[1, 2, 2, 4]} spacing={10} p={4}>
          {events.map((event, idx) => {
            return <Event event={event} key={idx} />;
          })}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default HomePage;
