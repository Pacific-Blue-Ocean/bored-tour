import { Heading, Stack, Button, FormControl, Flex } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
//import homepage from '../../public/images/HomePage.jpeg';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <div className="homePageBackground">
        <div className="searchBarFlex">
          <input type="text" className="homePageSearch" placeholder="What do you want to do?"/>
          <button className="homePageSearchButton">
            Go!
          </button>
        </div>
      </div>
      <div>
        <Flex>
      <Link to="event_detail"> this is an event picture </Link>

        </Flex>
      </div>
    </div>
  )
}

export default App;
