import {
  Button, ButtonGroup, extendTheme, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Event from './event.jsx'

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(true);

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  // const { isOpen, onOpen, onClose } = useDisclosure()

  const [events, setEvents] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false)


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

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30",  //black {header}
        200: "#8DD8E0",  //blue {border color}
        300: "#E3444B",  //red  {buttons}
        400: "#EC7C71",  //orange {button border}
        500: "#FBFAFA",  //white {subheaders, text}
      },
    },
  })

  const eventRows = events.reduce(function(rows, key, index) {
    return (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, [])

  const viewCalendar = () => {
    if (showCalendar) {
      return (
        <div className="calendar">
          <Calendar
            onChange={onChange}
            value={value}
          />
        </div>
      )
    }
  }

  return (
    <div className='homePageRelative'>
    <div className='homePageSelector'>
      <div className='dateTimeFlex'>
        <ButtonGroup spacing={6} direction='row' align='center'>
          <Button colorScheme='teal' size='lg' variant='outline' onClick={() => {setShowCalendar(!showCalendar)}}>
            Date
          </Button>
          {/* {viewCalendar()} */}
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
            onClick={() => {categories.current.scrollBy(-500, 0)}}
          />
        <div ref={categories} className='categories'>
          <ButtonGroup spacing={6} direction='row' align='center'>
            {categoriesList.map((category, idx) => (
              <Button
                colorScheme='teal'
                size='lg'
                variant='outline'
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