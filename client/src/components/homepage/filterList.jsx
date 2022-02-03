import { Button, ButtonGroup, Box, Icon, HStack, Grid } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import { MdSettingsBackupRestore } from "react-icons/md";
import Event from "./event.jsx";

const FilterList = ({ category, events, handleReset }) => {
  const [list, setList] = useState(events);

  useEffect(() => {
    setList(
      category === "All"
        ? events
        : events.filter((event) => {
          event.categories.sort().toString().replaceAll(' ', '').indexOf(category.sort().toString().replaceAll(' ', '')) !== -1;
        })
    );
  }, [category]);

  return (
    <Box pl="5em">
<<<<<<< HEAD
      <HStack spacing="5" pb="1em">
        <Box>Filter by: {category} </Box>
        <Button align="center" size='sm' onClick={handleReset}>
          Reset {" "} <Icon as={MdSettingsBackupRestore} w={6} h={6} pl="2px" color="#EC7C71"/>
=======
      <HStack spacing="5" marginBottom='2.5vh'>
        <Box>Filter by: {category}</Box>
        <Button onClick={handleReset}>
          Reset <Icon as={GrPowerReset} w={4} h={4} pl="2px" />
>>>>>>> main
        </Button>
      </HStack>
      <Grid
            templateColumns="repeat(4, 1fr)"
            gap={1}
            autoRows="auto"
            justify-content="space-evenly"
            justify-items="center"
            align-content="space-evenly"
            align-items="center"
            marginBottom="1.5vw"
          >
            {list.map((event, idx) => {
              return <Event event={event} key={idx} />;
            })}
          </Grid>
    </Box>
  );
};

export default FilterList;
