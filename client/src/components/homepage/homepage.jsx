import { Heading, Container, Box, Button, ButtonGroup, FormControl } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect } from 'react';

const HomePage = () => {

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  // useEffect(() => {
  //   console.log("slideLeft..", categories.current);
  //   slideLeft.current.onClick = (e) => {console.log('hi'); categories.current.scrollLeft += 20};
  //   slideRight.current.onClick = (e) => {categories.current.scrollRight -= 20};
  // });

  return (
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
  )
}

export default HomePage;