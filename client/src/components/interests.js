import { Box, Flex, Heading, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import Preferences from './preferences/Preferences.jsx';

const Interests = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
  <Box>
    <Header />
    <Box p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading fontSize='5vh'>Interests</Heading>
      <Preferences userId={1} />
    </Box>
  </Box>
  )
}

export default Interests;