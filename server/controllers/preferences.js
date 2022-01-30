const models = require('../models/preferences');

const getSurvey = async (req, res) => {
  const { rows } = await models.getSurvey();
  res.send(rows);
}

const postUserPreferences = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const { rows } = await models.postUserPreferences({userId: id, preferences: body});
  res.send(rows);
}

module.exports = {
  getSurvey,
  postUserPreferences,
};


