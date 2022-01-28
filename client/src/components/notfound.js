import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import { Link } from 'react-router-dom';


const NotFound = () => {

  return (
  <Box>
    <Header />
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading>You seem to be lost...</Heading>
      <Spacer />
      <Link to='/'><Button colorScheme='blue' size='lg'>Go Home</Button></Link>
    </Flex>
  </Box>
  )
}

export default NotFound;