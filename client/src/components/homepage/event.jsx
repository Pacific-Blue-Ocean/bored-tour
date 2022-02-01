import { Heading, Container, Box, Spacer, Flex, Button, ButtonGroup, FormControl, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Events = ({ event }) => {
  const backgroundImage = event.mainphoto
  return (
    <Link to={`/events/${event.id}`} style={{textDecoration: 'none'}}>
    <div className='homePageEventCard'>
      <div
        className='homePageEventInfo'>
        <img className='homePageEventPhoto' src={event.mainphoto}/>
        {event.title}
        <Spacer/>
        $ {event.price}
      </div>
    </div>
    </Link>
  )
}

export default Events;