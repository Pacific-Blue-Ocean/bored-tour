import { Header } from './header';
import HomePage from './homepage/homepage.jsx';
import React from "react";
import {
  Box, Heading, Spacer, Menu, Stack, FormControl,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  extendTheme,
 ChakraProvider
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";


const App = () => {

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30",  //black
        200: "#8DD8E0",  //blue
        300: "#E3444B",  //red
        400: "#EC7C71",  //orange
        500: "#FBFAFA",  //white
      },
    },
  })

  return (
    <div>
      <Flex style={{ borderBottom: '5px solid black' }}>
        <Link to="/">
          <Heading as='h1' fontSize='6vh' color='brand.500' p={8}>Bored Tour</Heading>
        </Link>
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
            <Link to="/login"><MenuItem>Log in</MenuItem></Link>
          </MenuList>
        </Menu>
        </Box>
      </Flex>
        <div className='homePageBackground'>
          <div className='searchBarFlex'>
            <input type='text' className='homePageSearch' placeholder='What do you want to do?'/>
            <button className='homePageSearchButton'>
              Go!
            </button>
          </div>
        </div>
      <HomePage/>
    </div>
  )
}

export default App;
