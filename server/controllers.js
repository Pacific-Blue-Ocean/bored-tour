const models = require('./models');

const getFriends = async (req, res) => {
  const { id } = req.query
  const { rows } = await models.getFriends(id);
  res.send(rows);
}

const getEvents = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  let filter = req.query.filter || {};
  const { rows } = await models.getEvents(limit,page,filter);
  res.send(rows);
}

module.exports = {
  getFriends, getEvents
};
