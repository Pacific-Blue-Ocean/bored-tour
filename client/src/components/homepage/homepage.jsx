import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Flex,
  Heading,
  Box,
  IconButton,
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
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import axios from "axios";
import Event from "./event.jsx";
import FilterList from "./filterList.jsx";

const HomePage = ({ searchEvent }) => {
  const [isLoading, setIsLoading] = useState(true);

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  const [events, setEvents] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(["10:00", "11:00"]);
  const [label, setLabel] = useState([]);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    const getEvents = axios
      .get("/api/events", { params: { limit: 10, page: 0 } })
      .then((response) => {
        setEvents(response.data);
      });
    const getAllCategories = axios.get("/api/categories").then((response) => {
      setCategoriesList(response.data);
    });
    const promises = [getEvents, getAllCategories];
    Promise.all(promises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (searchEvent.length > 0) {
      setEvents(searchEvent);
    }
  }, [searchEvent]);

  const handleClick = (event) => {
    event.preventDefault();
    setInitial(false);
    setLabel([...label, event.target.name].sort());
  };
  const handleReset = () => {
    setLabel([]);
  };

  const searchEventsTime = () => {
    const newDate = startDate.toLocaleDateString();
    const from = value ? value[0] : "00:00";
    const to = value ? value[1] : "23:59";
    axios
      .get("/api/searchEvents/time", {
        params: { date: newDate, validFrom: from, validTo: to },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Flex flexDirection="column" >
      <Flex
        display={{base: 'none', md: 'flex'}}
        marginTop="2vw"
        marginBottom="0"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Flex
          flexDirection="row"
          marginLeft="2vw"
          justifyContent="space-around"
        >
          <DatePicker
            className="calendar"
            closeOnScroll={true}
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            type="submit"
          />
          <TimeRangePicker
            className="react-timerange-picker"
            onChange={onChange}
            value={value}
            type="submit"
          />
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            backgroundColor="brand.500"
            color="brand.400"
            size="lg"
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
          w="50vw"
          alignItems="center"
          justifyContent="space-around"
          marginRight="2vw"
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
                  fontSize="1vw"
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
        fontSize={{ base: '20px', md: "5vh"}}
        marginLeft="5vw"
        marginTop="2vw"
        marginBottom="1vw"
      >
        Popular near you...
      </Heading>
      <FilterList
        category={label.length > 0 ? label : "All"}
        events={events}
        handleReset={handleReset}
      />
      {initial ? (
        <SimpleGrid columns={[1, 2,2, 4]} spacing={10} p={4}>
          {events.map((event, idx) => {
            return <Event event={event} key={idx} />;
          })}
        </SimpleGrid>
      ) : null}
    </Flex>
  );
};

export default HomePage;
