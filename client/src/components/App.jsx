import { Box, Image, Flex, Heading, Input, Center } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import homepage from '../../public/images/HomePage.jpeg';


const App = () => {
  return (
  <Box>
    <Header />
    <Box w='100%'>
      <Center w='100vw'>
        <Image src={homepage} w='100vw' h='70vh' objectFit='cover'/>
        <Input placeholder='idk' size='lg'/>
      </Center>
    </Box>
  </Box>
  )
}

export default App;