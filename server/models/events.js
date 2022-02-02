const db = require('../../database');

const getAllEvents = (limit = 10, page = 0) => {
  let offset = limit * page;
  const query = `
    select *
    from events
    limit ${limit}
    offset ${offset};
  `
  return db.pool.query(query);
}

const getSpecificEvent = (id) => {
  const query = `
    select *
    from events
    where id = ${id}
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
  return db.pool.query(query);
}

const searchEventsByTitle = (searchTerm, limit = 10, page = 0) => {
  let offset = limit * page;
  const query = `
    select *
    from events
    where title ilike '${searchTerm}%'
    limit ${limit}
    offset ${offset};
  `
  return db.pool.query(query);
}

const getUsersForEvent = (event_id) => {
  const query = `
    select user_id
    from events_users
    where events_id = ${event_id}
  `
  return db.pool.query(query);
}

const getEventsForUser = (user_id) => {
  const query = `
    select events_id
    from events_users
    where user_id = $1
  `
  return db.pool.query(query, [user_id]);
}

const addUserToEvent = (user_id, event_id) => {
  const query = `
    insert into events_users
    (events_id, user_id)
    values (${event_id}, ${user_id})
  `
  return db.pool.query(query);
}

const removeUserFromEvent = (user_id, event_id) => {
  const query = `
    delete from events_users
    where events_id = $1 and user_id = $2;
  `
  return db.pool.query(query, [event_id, user_id]);
}

const getEventCategoriesIds = (events_id) => {
  const query = `select preference_id
  from events_categories
  where events_id = $1
  `;
  return db.pool.query(query, [events_id])
};

module.exports = {
 getAllEvents, getEventsByTime, searchEventsByTitle, getUsersForEvent, addUserToEvent, removeUserFromEvent, getSpecificEvent, getEventCategoriesIds, getEventsForUser
};
