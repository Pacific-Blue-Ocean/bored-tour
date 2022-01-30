const db = require('../../database');

const getEvents = (limit = 10, page = 1, filter) => {
  let offset = limit * page;
  const query = `
    select *
    from events
    limit ${limit}
    offset ${offset}
  `
  return db.pool.query(query);
}

module.exports = {
 getEvents
};
