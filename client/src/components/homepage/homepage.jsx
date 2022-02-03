import { Button, ButtonGroup,   MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker/dist/entry.nostyle'
import axios from 'axios';
import Event from './event.jsx';
import FilterList from './filterList.jsx';

const HomePage = ( { searchEvent } ) => {

  const [isLoading, setIsLoading] = useState(true);

  const categories = useRef(null);
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  const [events, setEvents] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(['10:00', '11:00']);
  const [label, setLabel] = useState('');
  const [initial, setInitial] = useState(true);

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

  const eventRows = events.reduce(function(rows, key, index) {
    return (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, [])

  const handleClick = (event) => {
    event.preventDefault();
    setInitial(false);
    setLabel(event.target.name);
  }
  const handleReset = () => {
    setLabel('');
  }


  return (
    <div className='homePageRelative'>
    <div className='homePageSelector'>
      <div className='dateTimeFlex'>
        <ButtonGroup spacing={6} direction='row' align='center'>
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
                backgroundColor='brand.400'
                color='brand.500'
                size='lg'
                textStyle='button'
                fontSize='1vw'
                key={idx}
                name={category.label}
                onClick={(e) => handleClick(e)}
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
      <h2 className='homepageSubheading'>
        Popular near you...
      </h2>
      <FilterList category={label.length > 0 ? label : 'All'} events={events} handleReset={handleReset} />
      {initial ?

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
      : null}
    </div>
  )
}

export default HomePage;