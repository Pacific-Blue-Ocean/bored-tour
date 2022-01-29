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
  `

  return db.pool.query(query, [id]);
}

module.exports = {
  getFriends,
};
