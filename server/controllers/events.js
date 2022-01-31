const models = require('../models/events');

const getAllEvents = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;
  try {
    const { rows } = await models.getAllEvents(limit,page);
    res.send(rows);
  } catch (e) {
    res.status(500).send(e);
  }
}

const getSpecificEvent = async (req, res) => {
  let event_id = req.params.id;
  try {
    const { rows } = await models.getSpecificEvent(event_id);
    res.send(rows);
  } catch (e) {
    res.status(500).send(e);
  }
}

const getEventsByTime = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;
  let minutes = req.query.minutes;
  try {
    const { rows } = await models.getEventsByTime(minutes,limit, page);
    res.send(rows);
  } catch (e) {
    res.status(500).send(e);
  }
}

const searchEventsByTitle = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;
  let searchTerm = req.query.search;
  try {
    const { rows } = await models.searchEventsByTitle(searchTerm,limit, page);
    res.send(rows);
  } catch (e) {
    res.status(500).send(e);
  }
}

const getUsersForEvent = async (req, res) => {
  let event_id = req.params.id;
  try {
    const { rows } = await models.getUsersForEvent(event_id);
    res.send(rows);
  } catch (e) {
    res.status(500).send(e);
  }
}

const addUserToEvent = async (req, res) => {
  let user = req.body.user_id;
  let event = req.body.event_id;
  try {
    await models.addUserToEvent(user, event);
    res.send(`Sucessfully added user_id ${user} to event_id ${event}`);
  } catch (e) {
    res.status(500).send(e);
  }
}

const removeUserFromEvent = async (req, res) => {
  let user = req.body.user_id;
  let event = req.body.event_id;
  try {
    await models.removeUserFromEvent(user, event);
    res.send(`Sucessfully removed user_id ${user} from event_id ${event}`);
  } catch (e) {
    res.status(500).send(e);
  }
}


module.exports = {
   getAllEvents, getEventsByTime, searchEventsByTitle, getUsersForEvent, addUserToEvent, getSpecificEvent, removeUserFromEvent
};