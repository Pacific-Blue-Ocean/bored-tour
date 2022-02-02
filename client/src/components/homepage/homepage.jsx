import { Button, ButtonGroup, Grid, GridItem, Flex, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker/dist/entry.nostyle'
import axios from 'axios';
import Event from './event.jsx'

const HomePage = ( { searchEvent } ) => {

  const [isLoading, setIsLoading] = useState(true);

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  const [events, setEvents] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(['10:00', '11:00']);

  useEffect(() => {
    const getEvents = axios.get('/api/events', { params: { limit: 10, page: 0 } })
      .then((response) => { setEvents(response.data) })
    const getAllCategories = axios.get('/api/categories')
      .then((response) => { setCategoriesList(response.data) })
    const promises = [getEvents, getAllCategories];
    Promise.all(promises)
      .then(() => { setIsLoading(false) })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (searchEvent.length > 0) {
      setEvents(searchEvent)
    }
  }, [searchEvent])

  return (
    <Flex alignItems='center'>
    <div >
    <Flex marginTop='2vw' marginBottom='0'flexDirection='row' justifyContent='space-around' w='100%'>
      <Flex flexDirection='row' w='30vw' alignItems='center' justifyContent='flex-start'>
          <DatePicker
            className='calendar'
            closeOnScroll={true}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <TimeRangePicker
            className='react-timerange-picker'
            onChange={onChange}
            value={value} />
        </Flex>
      <Flex flexDirection='row' w='70vw' alignItems='center' justifyContent='space-around'>
        <ChevronLeftIcon
            ref={slideLeft}
            w={8}
            h={8}
            color='black.500'
            cursor='pointer'
            onClick={() => {categories.current.scrollBy(-500, 0)}}
          />
        <div ref={categories} className='categories'>
          <ButtonGroup spacing={6} direction='row' align='center'>
            {categoriesList.map((category, idx) => (
              <Button
                backgroundColor='brand.400'
                color='brand.500'
                size='lg'
                textStyle='button'
                fontSize='1vw'
                key={idx}
                //need category label in events
                // onClick={() => {setHomePageEvents(category.label)}}
              >{category.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
          <ChevronRightIcon
            ref={slideRight}
            w={8}
            h={8}
            color='black.500'
            cursor='pointer'
            onClick={() => {categories.current.scrollBy(500, 0)}}
          />
      </Flex>
    </Flex>
      <Heading fontSize='5vh'  marginLeft='5vw' marginTop='2vw' marginBottom='0'>
        Popular near you...
      </Heading>
      <Grid
        templateColumns='repeat(4, 1fr)'
        gap={1} autoRows='auto'
        justify-content='space-evenly'
        justify-items='center'
        align-content='space-evenly'
        align-items='center'>
        {events.map((event, idx) => {
          return (
            <Event
              event={event}
              key={idx}
            />
          )
        })}
      </Grid>
    </div>
    </Flex>
  )
}

export default HomePage;