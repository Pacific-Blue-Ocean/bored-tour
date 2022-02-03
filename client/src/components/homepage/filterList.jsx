import { Button, ButtonGroup, Box, Icon, HStack } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import Event from "./event.jsx";

const FilterList = ({ category, events, handleReset }) => {
  const [list, setList] = useState(events);

  useEffect(() => {
    setList(
      category === "All"
        ? events
        : events.filter((event) => event.categories.indexOf(category) !== -1)
    );
  }, [category]);

  let eventRows = list.reduce(function (rows, key, index) {
    return (
      (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);

  return (
    <Box pl="5em">
      <HStack spacing="5">
        <Box>Filter by: {category}</Box>
        <Button onClick={handleReset}>
          Reset <Icon as={GrPowerReset} w={4} h={4} pl="2px" />
        </Button>
      </HStack>
      <div className="eventContainer">
        {eventRows.map((row, idx) => (
          <div className="eventRows" key={idx}>
            {row.map((event, idx) => (
              <Event event={event} key={idx} />
            ))}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default FilterList;
