import { Header } from './header';
import HomePage from './homepage/homepage.jsx';
import React, { useState, useEffect } from "react";
import {
  Box, Heading, Spacer, Menu, Stack, FormControl, Input,
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
import {logout} from './firebase';
import { getAuth } from "firebase/auth";


const App = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const [search, setSearch] = useState(null)
  const [searchEvent, setSearchEvent] = useState([])

  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(['10:00', '11:00']);

  const searchEvents = (e) => {
    e.preventDefault();
    axios.get('/api/searchEvents/title', { params: { search: search }})
      .then((response) => {
        setSearchEvent(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const searchEventsTime = (e) => {
    e.preventDefault();
    axios.get('/api/searchEvents/time', { params: { date: startDate, validFrom: value[0], validTo: value[1]}})
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

 if (user) {
  return (
    <div>
      <Flex w='100vw'>
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
            <Button fontSize='2.5vh' color='brand.400' onClick={logout}> Log Out </Button>
          </MenuList>
        </Menu>
        </Box>
      </Flex>
      <Box
        backgroundImage="url('./images/RaccoonParty.jpeg')"
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundPosition='30% 50%'
        w='100vw'
        h='56vh'
      >
        <Flex justifyContent='center' alignItems='center'>
          <form onSubmit={searchEvents}>
            <Input
              backgroundColor='rgba(255, 255, 255, 0.6)'
              focusBorderColor="brand.400"
              _placeholder={{
                color: "grey"
              }}
              w='30vw'
              color='brand.100'
              fontSize='2.5vh'
              padding='1.5vw'
              marginTop='25vh'
              marginRight='2.5vw'
              type='text'
              placeholder='What do you want to do?'
              onChange={(e) => {setSearch(e.target.value)}}
            />
            <Button
              color='brand.500'
              backgroundColor='brand.400'
              w='5vw'
              marginTop='auto'
              fontSize='2.5vh'
              padding='1.5vw'
              type='submit'
            >Go!</Button>
          </form>
        </Flex>
        </Box>
      <HomePage
        searchEvent={searchEvent}
        startDate={startDate}
        setStartDate={setStartDate}
        value={value}
        onChange={onChange}
      />
    </div>
  )
  } else {
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
              <Link to="/login"><MenuItem>Log in</MenuItem></Link>
              <Link to="/register"><MenuItem>Register</MenuItem></Link>
            </MenuList>
          </Menu>
          </Box>
        </Flex>
        <Box
            backgroundImage="url('./images/RaccoonParty.jpeg')"
            backgroundSize='cover'
            backgroundRepeat='no-repeat'
            backgroundPosition='30% 50%'
            w='100vw'
            h='56vh'
          >
            <Flex justifyContent='center' alignItems='center'>
              <form onSubmit={searchEvents}>
                <Input
                  backgroundColor='rgba(255, 255, 255, 0.6)'
                  focusBorderColor="brand.400"
                  _placeholder={{
                    color: "grey"
                  }}
                  w='30vw'
                  color='brand.100'
                  fontSize='2.5vh'
                  padding='1.5vw'
                  marginTop='25vh'
                  marginRight='2.5vw'
                  type='text'
                  placeholder='What do you want to do?'
                  onChange={(e) => {setSearch(e.target.value)}}/>
                <Button
                  color='brand.500'
                  backgroundColor='brand.400'
                  w='5vw'
                  marginTop='auto'
                  fontSize='2.5vh'
                  padding='1.5vw'
                  type='submit'
                >Go!</Button>
              </form>
            </Flex>
          </Box>
        <HomePage
          searchEvent={searchEvent}
          startDate={startDate}
          setStartDate={setStartDate}
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
}

export default App;