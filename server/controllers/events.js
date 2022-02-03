
const models = require('../models/events');
const pref = require('../models/preferences');

const getAllEvents = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 0;

  try {
    //get event rows
    let eventsPromise = new Promise( async (resolve, reject) => {
      const { rows } = await models.getAllEvents(limit,page);
      resolve(rows);
    });

    eventsPromise.then((data) => {
      let catPromise = new Promise(async (resolve, reject) => {
        let events = [];
        for (let i = 0; i < data.length; i++) {

          //for each event, get the category ID
          let cat = await models.getEventCategoriesIds(data[i].id);
          data[i].categories = [];

          //for each category id, get the category labels and add them to a categories array
          for (let j = 0; j < cat.rows.length; j++) {
            let label = await pref.getLabelOfPrefById(cat.rows[j].preference_id);
            data[i].categories.push(label.rows[0].label);
          }
          events.push(data[i]);
        }
        resolve(events);
      });
      catPromise.then((data) => {
        res.send(data);
      });
    });
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
  let date = req.query.date;
  let validFrom = req.query.validFrom;
  let validTo = req.query.validTo;
  try {
    const { rows } = await models.getEventsByTime(date, validFrom, validTo, limit, page);
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


const getEventsForUser = async (req, res) => {
  let user_id = req.params.id;
  try {
    const { rows } = await models.getEventsForUser(user_id);
    let events = [];
    for (let i = 0; i < rows.length; i++) {
      const event = await models.getSpecificEvent(rows[i].events_id);
      events.push(event.rows[0]);
    };
    res.send(events);
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
   getAllEvents, getEventsByTime, searchEventsByTitle, getUsersForEvent, addUserToEvent, getSpecificEvent, removeUserFromEvent, getEventsForUser
};