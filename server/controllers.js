const models = require('./models');

const getFriends = async (req, res) => {
  const { rows } = await models.getFriends();
  res.send(rows);
}

module.exports = {
  getFriends,
};
