const db = require('../../database');

const getLocations = () => {
  const query = `select id, label from locations`
  return db.pool.query(query);
}

module.exports = {
  getLocations,
};
