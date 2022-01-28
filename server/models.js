const db = require('../database');

const getFriends = () => {
  const query = `
    select
      *
    from users;
  `

  return db.pool.query(query);
}

module.exports = {
  getFriends,
};
