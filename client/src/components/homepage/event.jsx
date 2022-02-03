import { Spacer, GridItem, Image, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {
  return (
    <GridItem fontSize='2vh' textAlign='center' justifyContent='center' alignItems='center' h='52vh' marginLeft='auto' marginRight='auto'>
      <Flex alignItems='center' justifyContent='space-around' w='32vh'>
        <Link to={`/events/${event.id}`} style={{textDecoration: 'none'}}>
          <Image src={event.mainphoto} align='center' w='32vh' h='40vh' objectFit='cover' borderRadius='5%' marginBottom='0.5vw'/>
          {event.title}
          <Spacer/>
          $ {event.price}
        </Link>
      </Flex>
    </GridItem>
  )
}

export default Event;