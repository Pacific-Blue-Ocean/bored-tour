import React, { useState } from 'react';
import {
  Box, Input, Button, Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { Header } from './header';
import HomePage from './homepage/homepage.jsx';

function App() {
  const [search, setSearch] = useState(null);
  const [searchEvent, setSearchEvent] = useState([]);

  const searchEvents = (e) => {
    e.preventDefault();
    axios.get('/api/searchEvents/title', { params: { search } })
      .then((response) => {
        setSearchEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <Box
        backgroundImage="url('./images/RaccoonParty.jpeg')"
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundPosition='30% 50%'
        w='100vw'
        h={{ base: '20vh', md: '56vh', }}
      >
      <Flex justifyContent='center' alignItems='center' height='100%' justifyItems='center'>
        <form onSubmit={searchEvents}>
          <Input
            backgroundColor='rgba(255, 255, 255, 0.6)'
            focusBorderColor="brand.400"
            _placeholder={{
              color: "grey"
            }}
            w={{ base: '60vw', md: '60vw'}}
            color='brand.100'
            fontSize='2.5vh'
            p={8}
            mr={2}
            type='text'
            placeholder='What do you want to do?'
            onChange={(e) => {setSearch(e.target.value)}}
          />
          <Button
            color='brand.500'
            backgroundColor='brand.400'
            w={{base: '2vw', md: '5vw'}}
            marginTop='auto'
            fontSize='2.5vh'
            p={8}
            type='submit'
          >Go!</Button>
        </form>
      </Flex>
      </Box>
      <HomePage
        searchEvent={searchEvent}
      />
    </div>
  );
}

export default App;
