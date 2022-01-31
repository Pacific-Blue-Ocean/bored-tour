import { Heading, Box, Stack, Button, FormControl, Flex, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import { Link } from "react-router-dom";
import homepage from '../../public/images/HomePage.jpeg';
import HomePage from './homepage/homepage.jsx';

const App = () => {

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
    <div>
      <Header />
      {/* <Box
        backgroundImage="url('./images/Homepage.jpeg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      > */}
        <div className='homePageBackground'>
          <div className='searchBarFlex'>
            <input type='text' className='homePageSearch' placeholder='What do you want to do?'/>
            <button className='homePageSearchButton'>
              Go!
            </button>
          </div>
        </div>

      {/* </Box> */}
      <HomePage/>
    </div>
  )
}

export default App;
