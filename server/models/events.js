const db = require('../../database');

const getAllEvents = (limit = 10, page = 0) => {
  console.log(limit, page)
  let offset = limit * page;
  const query = `
    select *
    from events
    limit ${limit}
    offset ${offset};
  `
  return db.pool.query(query);
}

const getEventsByTime = (minutes,limit = 10, page = 0) => {
  let offset = limit * page;
  const query = `
    select *
    from events
    where event_length_minutes < ${minutes}
    limit ${limit}
    offset ${offset};
  `
  console.log('time ', query);
  return db.pool.query(query);
}

const searchEventsByTitle = (searchTerm,limit = 10, page = 0) => {
  let offset = limit * page;
  const query = `
    select *
    from events
    where title ilike '${searchTerm}%'
    limit ${limit}
    offset ${offset};
  `
  console.log('title ', query);
  return db.pool.query(query);
}

module.exports = {
 getAllEvents, getEventsByTime, searchEventsByTitle
};
