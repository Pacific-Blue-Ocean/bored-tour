const models = require('./models');

const getFriends = async (req, res) => {
  const { id } = req.query
  const { rows } = await models.getFriends(id);
  res.send(rows);
}

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
  getFriends,
  getSurvey,
  postUserPreferences
};
