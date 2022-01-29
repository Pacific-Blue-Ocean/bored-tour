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

module.exports = {
  getFriends,
};
