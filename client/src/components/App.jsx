import { Box, Image, Flex, Heading, Input, Center } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import homepage from '../../public/images/HomePage.jpeg';

const App = () => {
  return (
    <div>
      <Box>
        <Header />
        <div className="homePageBackground">
            <input type="text" className="homePageSearch" placeholder="What do you want to do?"/>
        </div>
      </Box>
    </div>
  )
}

export default App;
