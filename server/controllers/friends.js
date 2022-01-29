const models = require('../models/friends');

const getFriends = async (req, res) => {
  const { id } = req.query
  const { rows } = await models.getFriends(id);
  res.send(rows);
}

module.exports = {
  getFriends,
};