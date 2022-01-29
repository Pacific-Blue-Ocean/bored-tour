const db = require('../database');

const getFriends = (id) => {
  const query = `
    select distinct
      u.*
      ,case
        when r.id is not null then true
        else false
      end as friend
    from users u
    left join relationships r
      on u.id = r.from_user_id
    where u.id <> $1
    order by friend desc, u.id
  `

  return db.pool.query(query, [id]);
}

const addFriend = (id, friend_id) => {
  const query = `
    insert into relationships (from_user_id, to_user_id) values ($1, $2)
  `

  return db.pool.query(query, [id, friend_id]);
}

module.exports = {
  getFriends,
  addFriend,
};
