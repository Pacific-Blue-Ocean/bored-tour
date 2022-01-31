import { Box, Flex, Heading, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';


const Events = () => {
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
  <Box>
    <Header />
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading>Events Go Here</Heading>
    </Flex>
  </Box>
  )
}

export default Events;