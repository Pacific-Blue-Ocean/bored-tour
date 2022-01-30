const models = require('../models/events');

const getEvents = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  let filter = req.query.filter || {};
  const { rows } = await models.getEvents(limit,page,filter);
  res.send(rows);
}

module.exports = {
   getEvents
};