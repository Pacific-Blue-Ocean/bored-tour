require('dotenv').config();
const path = require('path');
const express = require('express');
const middleware = require('./middleware');
// controllers
const events = require('./controllers/events');
const friends = require('./controllers/friends');
const preferences = require('./controllers/preferences');
const locations = require('./controllers/locations');
const users = require('./controllers/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/public'));
app.use(express.json());
app.use(middleware.logger);

app.get('/google/auth', (req, res) => {
  if (process.env.GOOGLE_API) {
    res.send(process.env.GOOGLE_API);
  } else {
    res.status(403).send('Access denied. Please set up a Google_API token in your server\'s .env file.');
  }
});

app.get('/api/events', events.getAllEvents);
app.get('/api/categories', preferences.getAllCategories);
app.get('/api/events/:id', events.getSpecificEvent);
app.get('/api/events/users/:id', events.getUsersForEvent);
app.get('/api/events/user/:id', events.getEventsForUser);
app.post('/api/events/users', events.addUserToEvent);
app.delete('/api/events/users', events.removeUserFromEvent);

app.get('/api/searchEvents/time', events.getEventsByTime);
app.get('/api/searchEvents/title', events.searchEventsByTitle);

// friends
app.get('/api/friends', friends.getFriends);
app.post('/api/friends', friends.addFriend);
app.delete('/api/friends', friends.removeFriend);

// user
app.get('/api/users/:id', users.getUser);
app.post('/api/users/add', users.addUser);

// preferences
app.get('/api/preferences', preferences.getSurvey);
app.get('/api/users/:id/preferences', preferences.getUserPreferences);
app.get('/api/users/:id/has-completed-survey', users.getUserHasCompletedSurvey);
app.get('/api/locations', locations.getLocations);

app.post('/api/users/:id/preferences', preferences.postUserPreferences);
app.post('/api/users/:id/has-completed-survey', users.updateUserHasCompletedSurvey);

app.put('/api/users/:id/location', users.updateUserLocation);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}../../client/public/index.html`));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
