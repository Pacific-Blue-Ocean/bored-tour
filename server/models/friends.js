const db = require('../../database');

const getFriends = (id) => {
  const query = `
    select distinct
      u.id
      ,u.full_name
      ,l.label as location
      ,case
        when r.id is not null then true
        else false
      end as friend
    from users u
    left join locations l
      on u.location_id = l.id
    left join relationships r
      on u.id = r.from_user_id
    where u.id <> $1
    order by friend desc, u.id
  `;

  return db.pool.query(query, [id]);
};

const addFriend = (user_id, friend_id) => {
  const queryFrom = 'insert into relationships (from_user_id, to_user_id) values ($1, $2)';
  const queryTo = 'insert into relationships (to_user_id, from_user_id) values ($1, $2)';
  const queries = [];
  queries.push(db.pool.query(queryFrom, [user_id, friend_id]));
  queries.push(db.pool.query(queryTo, [user_id, friend_id]));
  return Promise.all(queries);
};

const removeFriend = (user_id, friend_id) => {
  const query = `
    delete
    from relationships
    where
      (from_user_id = $1 and to_user_id = $2)
      or (to_user_id = $1 and from_user_id = $2)
  `;

  return db.pool.query(query, [user_id, friend_id]);
};

module.exports = {
  getFriends,
  addFriend,
  removeFriend,
};
