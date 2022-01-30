const models = require('../models/preferences');

const getSurvey = async (req, res) => {
  const { rows } = await models.getSurvey();
  res.send(rows);
}

const postUserPreferences = async (req, res) => {
  const { body } = req;
  const { rows } = await models.postUserPreferences(body);
  res.send(rows);
}

module.exports = {
  getSurvey,
  postUserPreferences,
};
