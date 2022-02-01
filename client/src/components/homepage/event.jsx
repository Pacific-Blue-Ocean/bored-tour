import { Heading, Container, Box, Spacer, Flex, Button, ButtonGroup, FormControl, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';

const Events = ({ event }) => {
  const backgroundImage = event.mainphoto
  return (
    <div className='homePageEventCard'>
      <div
        className='homePageEventInfo'>
        <img className='homePageEventPhoto' src={event.mainphoto}/>
        {event.title}
        <Spacer/>
        $ {event.price}
      </div>
    </div>
  )
}

export default Events;