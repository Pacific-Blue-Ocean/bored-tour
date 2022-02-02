import { Header } from './header';
import HomePage from './homepage/homepage.jsx';
import React, { useState, useEffect } from "react";
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
  extendTheme
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import axios from 'axios';


const App = () => {


  const [search, setSearch] = useState(null)
  const [searchEvent, setSearchEvent] = useState([])


  const searchEvents = () => {
    axios.get('/api/searchEvents/title', { params: { search: search }})
      .then((response) => {
        setSearchEvent(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Flex>
        <Link to="/">
          <Heading as='h1' fontSize='6vh' h='11.5vh' color='brand.400' p={8}>bored tour</Heading>
        </Link>
        <Spacer />
        <Box p={4}>
        <Menu>
          <MenuButton padding='1vw' fontSize='2.5vh' color='brand.400' as={Button} rightIcon={<ChevronDownIcon />}>
          Username
          </MenuButton>
          <MenuList fontSize='2.5vh' color='brand.400'>
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
            <input type='text' className='homePageSearch' placeholder='What do you want to do?' onChange={(e) => {setSearch(e.target.value)}}/>
            <button className='homePageSearchButton' color='#EC7C71' onClick={searchEvents(search)}>
              Go!
            </button>
          </div>
        </div>
      <HomePage
        searchEvent={searchEvent}
      />
    </div>
  )
}

export default App;
