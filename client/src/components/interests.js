import { Box, Flex, Heading, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import Preferences from './preferences/Preferences.jsx';

const Interests = () => {

  return (
  <Box>
    <Header />
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading fontSize='5vh'>Interests</Heading>
    </Flex>
  </Box>
  )
}

export default Interests;