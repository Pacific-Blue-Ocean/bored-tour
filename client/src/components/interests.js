import { Box, Flex, Heading, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import Preferences from './preferences/Preferences.jsx';

const Interests = () => {
  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30",  //black {header}
        200: "#8DD8E0",  //blue {border color}
        300: "#E3444B",  //red  {buttons}
        400: "#EC7C71",  //orange {button border}
        500: "#FBFAFA",  //white {subheaders, text}
      },
    },
  })

  return (
  <Box>
    <Header />
    <Box p={3} m={3} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading>Interests</Heading>
      <Box>
        <Preferences userId={1} />
      </Box>
    </Box>
  </Box>
  )
}

export default Interests;