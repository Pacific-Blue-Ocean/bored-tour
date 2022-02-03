const models = require('../models/locations');

const getLocations = async (req, res) => {
  const { rows } = await models.getLocations();
  res.send(rows);
}

module.exports = {
  getLocations,
};
