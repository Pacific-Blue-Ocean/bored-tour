import { Heading, Stack, Button, FormControl } from '@chakra-ui/react';
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
      <Link to="event_detail"> this is an event picture </Link>
    </div>
  )
}

export default App;
