const db = require('../../database');

const getSurvey = () => {
  const query = ` SELECT json_agg(json_build_object(
    'stepId', id,
    'label', label,
    'question', question,
    'type', type,
    'preferences', (
      SELECT json_agg(preferences)
      FROM (
        SELECT
          id,
          parent_preference_id,
          label,
          description
        FROM preferences WHERE preference_step_id = steps.id
      ) as preferences
    )
  )) FROM preferences_steps AS steps`;

  return db.pool.query(query);
}

const getUserPreferences = (userId) => {
  const query = `SELECT json_agg(preferences_id) FROM  users_preferences where user_id = ${userId}`
  return db.pool.query(query);
}

const getLabelOfPrefById = (id) => {
  const query = `SELECT label FROM preferences where id = ${id}`
  return db.pool.query(query);
}

const getAllCategories = () => {
  const query = `SELECT label, COUNT(label) AS categories FROM preferences GROUP BY label`
  return db.pool.query(query);
}

const removeUserPreferences = (userId) => {
  const query = `DELETE from users_preferences WHERE user_id = ${userId}`;
  return db.pool.query(query);
}

const postUserPreferences = ({userId, preferences}) => {
  const values = preferences.map(preferenceId => `(${userId} , ${preferenceId})`).join(',');
  const query = `insert into users_preferences (user_id, preferences_id) values ${values};`

  return db.pool.query(query);
}

module.exports = {
  getSurvey,
  getUserPreferences,
  getAllCategories,
  postUserPreferences,
  removeUserPreferences,
  getLabelOfPrefById
};
