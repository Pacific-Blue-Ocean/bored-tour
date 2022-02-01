import { Heading, Container, Box, Spacer, Flex, Button, ButtonGroup, FormControl, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Event from './event.jsx'

const HomePage = () => {

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events', {
      params: {
        limit: 10,
        page: 0
      }
    })
      .then((response) => {
        setEvents(response.data)
      })
      .catch((err) => { console.log(err) });
  }, [])

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

  const eventRows = events.reduce(function(rows, key, index) {
    return (index % 6 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, [])

  return (
    <div>
    <div className='homePageSelector'>
      <div className='dateTimeFlex'>
        <ButtonGroup spacing={6} direction='row' align='center'>
          <Button colorScheme='teal' size='lg' variant='outline'>
            Date
          </Button>
          <Button colorScheme='teal' size='lg' variant='outline'>
            Time
          </Button>
        </ButtonGroup>
      </div>
      <div className='categoriesFlex'>
        <ChevronLeftIcon
            ref={slideLeft}
            w={8}
            h={8}
            color='black.500'
            cursor='pointer'
            onClick={() => {categories.current.scrollBy(-300, 0)}}
          />
        <div ref={categories} className='categories'>
          <ButtonGroup spacing={6} direction='row' align='center'>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Parks
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Massage
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Concerts
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Tournaments
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Bars
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Video Game
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Twitch/Youtube Streams
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Yoga
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Sports
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Museums
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Sports
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Sports
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Sports
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Sports
            </Button>
            <Button colorScheme='teal' size='lg' variant='outline'>
              Sports
            </Button>
          </ButtonGroup>
        </div>
          <ChevronRightIcon
            ref={slideRight}
            w={8}
            h={8}
            color='black.500'
            cursor='pointer'
            onClick={() => {categories.current.scrollBy(300, 0)}}
          />
      </div>
    </div>
      <div className='eventContainer'>
        {eventRows.map((row, idx) => (
          <div
            className='eventRows'
            key={idx}>
              {row.map((event, idx) => (
                <Event
                  event={event}
                  key={idx}
                />
                ))}
          </div>
          ))}
      </div>
    </div>
  )
}

export default HomePage;