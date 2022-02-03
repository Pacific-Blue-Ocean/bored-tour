const models = require('../models/users');

const addUser = async(req, res) => {
  const { id, email, full_name } = req.body;
  const { rows } = await models.addUser(id, email, full_name);
  res.send(rows);
}

const getUser = async(req, res) => {
  const { id } = req.params;
  const { rows } = await models.getUser(id);
  res.send(rows);
}

const updateUserLocation = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { rows } = await models.updateUserLocation(id, body);
  res.send(rows);
}

const updateUserHasCompletedSurvey = async (req, res) => {
  const { id } = req.params;
  const { rows } = await models.updateUserHasCompletedSurvey(id);
  res.send(rows);
}

const getUserHasCompletedSurvey = async (req, res) => {
  const { id } = req.params;
  const { rows } = await models.getUserHasCompletedSurvey(id);
  res.send(rows);
}

module.exports = {
  updateUserLocation,
  updateUserHasCompletedSurvey,
  getUserHasCompletedSurvey,
  getUser,
  addUser
};
