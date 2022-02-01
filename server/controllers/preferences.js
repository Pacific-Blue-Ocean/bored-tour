const models = require('../models/preferences');

const getSurvey = async (req, res) => {
  const { rows } = await models.getSurvey();
  res.send(rows[0].json_agg);
}

const getUserPreferences = async (req, res) => {
  console.log('getUserPreferences')
  const { id } = req.params;
  const { rows } = await models.getUserPreferences(id);

  res.send(rows[0].json_agg);
}

const postUserPreferences = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await models.removeUserPreferences(id);

  const { rows } = await models.postUserPreferences({userId: id, preferences: body});
  res.send(rows);
}

module.exports = {
  getSurvey,
  getUserPreferences,
  postUserPreferences
};
