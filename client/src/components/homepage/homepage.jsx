import { Button, ButtonGroup, Grid, GridItem, Flex, Heading, Box, IconButton} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
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

  const searchEventsTime = () => {
    console.log('hi')
    const newDate = startDate.toLocaleDateString()
    axios.get('/api/searchEvents/time', { params: { date: newDate, validFrom: value[0], validTo: value[1]}})
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Flex flexDirection='column'>
      <Flex marginTop='2vw' marginBottom='0' flexDirection='row' justifyContent='space-evenly'>
        <Flex flexDirection='row' marginLeft='2vw' justifyContent='space-around'>
          <DatePicker
            className='calendar'
            closeOnScroll={true}
            selected={startDate}
            onChange={(date) => {setStartDate(date)}}
            type='submit'
          />
          <TimeRangePicker
            className='react-timerange-picker'
            onChange={onChange}
            value={value}
            type='submit'
          />
          <IconButton aria-label='Search database' icon={<SearchIcon />}
            backgroundColor='brand.500'
            color='brand.400'
            size='lg'
            textStyle='button'
            fontSize='1vw'
            _hover={{
              backgroundColor: 'brand.400',
              color: 'brand.500'
            }}
            onClick={(e) => {searchEventsTime()}}
          />
        </Flex>
        <Flex flexDirection='row' w='50vw' alignItems='center' justifyContent='space-around' marginRight='2vw'>
          <ChevronLeftIcon
            ref={slideLeft}
            w={8}
            h={8}
            color='black.500'
            cursor='pointer'
            onClick={() => {categories.current.scrollBy(-500, 0)}}
          />
          <Box w='90%' overflowX='hidden' ref={categories}>
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
          </Box>
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
      <Flex>
        <Heading fontSize='5vh'  marginLeft='5vw' marginTop='2vw' marginBottom='2vw'>
          Popular near you...
        </Heading>
      </Flex>
      <Flex justifyContent='center'>
        <Grid
          templateColumns='repeat(4, 1fr)'
          gap={1}
        >
          {events.map((event, idx) => {
            return (
              <Event
                event={event}
                key={idx}
              />
            )
          })}
        </Grid>
      </Flex>
    </Flex>
  )
}

export default HomePage;