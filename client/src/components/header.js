import React from "react";
import {
  Box, Heading, Spacer, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";


export const Header = () => {

  return (
    <Flex style={{ borderBottom: '5px solid black' }}>
    <Link to="/"><Heading as='h1' fontSize='6vh' p={8}>Bored Tour</Heading></Link>
      <Spacer />
      <Box p={4}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
         Username
        </MenuButton>
        <MenuList>
          <Link to="/events"><MenuItem>My Events</MenuItem></Link>
          <Link to="/friends"><MenuItem>My Friends</MenuItem></Link>
          <Link to="/interests"><MenuItem>My Interests</MenuItem></Link>
        </MenuList>
      </Menu>
      </Box>
  </Flex>
  )
}