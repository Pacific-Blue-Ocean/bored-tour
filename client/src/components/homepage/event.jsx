import { Heading, Container, Box, Spacer, Flex, Button, ButtonGroup, FormControl } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';

const Event = ({ event }) => {
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

export default Event;