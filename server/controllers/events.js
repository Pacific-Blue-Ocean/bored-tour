const models = require('../models/events');

const getAllEvents = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;
  const { rows } = await models.getAllEvents(limit,page);
  res.send(rows);
}

const getEventsByTime = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;
  let minutes = req.query.minutes
  const { rows } = await models.getEventsByTime(minutes,limit, page);
  res.send(rows);
}

const searchEventsByTitle = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;
  let searchTerm = req.query.search
  const { rows } = await models.searchEventsByTitle(searchTerm,limit, page);
  res.send(rows);
}

module.exports = {
   getAllEvents, getEventsByTime, searchEventsByTitle
};