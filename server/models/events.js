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

const getUsersForEvent = (event_id) => {
  const query = `
    select *
    from events_users
    where event_id = ${event_id}
  `
  return db.pool.query(query);
}

const addUserToEvent = (user_id, event_id) => {
  const query = `
    insert into events_users
    (event_id, user_id)
    values (${event_id}, ${user_id})
  `
  return db.pool.query(query);
}

const removeUserFromEvent = (user_id, event_id) => {
  const query = `
  delete from events_users
  where (event_id = ${event_id}, user_id = ${user_id})
  `
  return db.pool.query(query);
}

module.exports = {
 getAllEvents, getEventsByTime, searchEventsByTitle, getUsersForEvent, addUserToEvent, removeUserFromEvent
};