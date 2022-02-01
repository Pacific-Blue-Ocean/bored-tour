const db = require('../../database');

const getUser = (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  return db.pool.query(query, [id]);
}

const updateUserLocation = (id, {locationId}) => {
  const query = `UPDATE users SET location_id=${locationId} WHERE id = $1`;
  return db.pool.query(query, [id]);
}

const updateUserHasCompletedSurvey = (id) => {
  const query = `UPDATE users SET has_completed_survey=true WHERE id = $1`;
  return db.pool.query(query, [id]);
}

const getUserHasCompletedSurvey = (id) => {
  const query = `SELECT has_completed_survey from users WHERE id = $1`;
  return db.pool.query(query, [id]);
}

module.exports = {
  updateUserLocation,
  updateUserHasCompletedSurvey,
  getUserHasCompletedSurvey,
  getUser
};
