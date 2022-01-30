const db = require('../database');

const getFriends = (id) => {
  const query = `
    select
      u.*
    from relationships r
    join users u
      on r.to_user_id = u.id
    where r.from_user_id = $1;
  `

  return db.pool.query(query, [id]);
}

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
  getFriends, getEvents
};
