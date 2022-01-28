import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';


const App = () => {
  return (
  <Box>
    <Header />
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading>Home Page</Heading>
    </Flex>
  </Box>
  )
}

export default App;