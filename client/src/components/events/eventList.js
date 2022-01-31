import { Box, Flex, Heading, SimpleGrid, GridItem, AspectRatio, Text, Spacer, Image, Badge, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import DayJS from 'react-dayjs';

const EventItemBlock = (props) => {


  return (
    <Link to={`/events/${props.event.id}`} style={{textDecoration: 'none'}}>
  <Box>
    <AspectRatio ratio={1} mb={4}>
    <Image
    src={props.event.mainphoto} borderRadius='lg'/>
    </AspectRatio>
      <Heading size='lg' mb={2}>{props.event.title}</Heading>
      <HStack mb={2}>
      <Badge colorScheme='purple'>{props.event.event_length_minutes} mins</Badge>
      {props.event.digital ? <Badge>Digital</Badge> : null}
      </HStack>

      <Text mb={4} as='em'>{props.event.details}</Text>
      <Text mb={4} color='gray.500' fontSize='sm'>{props.event.description}</Text>
      <Text mb={4}>{props.event.location}
      </Text>
  </Box>
  </Link>
  )
}

const EventItemList = (props) => {
  return (
  <Link to={`/events/${props.event.id}`}>
  <Flex p={5} borderBottom='1px solid grey'>
    <Image boxSize='100px' borderRadius='lg' objectFit='cover' src={props.event.mainphoto} mr={4}/>
    <Flex width='500px' mr={4} justify={'center'} direction={'column'} >
      <Heading size='md'>{props.event.title}</Heading>
      <Text fontSize='sm'>{props.event.details}</Text>
    </Flex>
    <Spacer />
      <Box>{props.event.digital ? <Badge>Digital</Badge> : null}</Box>
  </Flex>
  </Link>
  )
}

const EventList = (props) => {
  if (props.listStyle === 'list') {
    return (
      <Box border='1px' borderRadius='10px' borderColor='#8F8F8F'>
        {props.events.map((event, i) => { return <EventItemList key={i} event={event} />  })}
      </Box>
    )
  } if (props.listStyle === 'map') {
    return (
      <Flex p={5} border='1px' borderRadius='10px' borderColor='#8F8F8F' borderRadius='lg'>
        <div style="width: 100%"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/golf-gps/">golf range finders</a></iframe></div>
      </Flex>
    )
  }
  else {
    return (
      <Flex p={5} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
        <SimpleGrid columns={4} spacing={10} p={4}>
          { props.events.map((event, i) => { return <GridItem key={i}><EventItemBlock event={event} /></GridItem> })}
        </SimpleGrid>
      </Flex>
    )
  }
}


export default EventList;