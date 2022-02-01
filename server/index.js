require('dotenv').config();
const path = require('path');
const express = require('express');
const middleware = require('./middleware');
// controllers
const events = require('./controllers/events');
const friends = require("./controllers/friends");
const preferences = require("./controllers/preferences");
const locations = require("./controllers/locations");
const users = require("./controllers/users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/public'));
app.use(express.json());
app.use(middleware.logger);

app.get('/api/events', events.getAllEvents);
app.get('/api/categories', preferences.getAllCategories);
app.get('/api/events/:id', events.getSpecificEvent);
app.get('/api/events/users/:id', events.getUsersForEvent);
app.post('/api/events/users', events.addUserToEvent);

app.get('/api/events/m', events.getEventsByTime);
app.get('/api/events/s', events.searchEventsByTitle);

// friends
app.get('/api/friends', friends.getFriends);
app.post('/api/friends', friends.addFriend);
app.delete('/api/friends', friends.removeFriend);

app.get('/api/preferences', preferences.getSurvey);
app.get('/api/users/:id', users.getUser);
app.get('/api/users/:id/preferences', preferences.getUserPreferences);
app.get('/api/users/:id/has-completed-survey', users.getUserHasCompletedSurvey);
app.get('/api/locations', locations.getLocations);

app.post('/api/users/:id/preferences', preferences.postUserPreferences);
app.post('/api/users/:id/has-completed-survey', users.updateUserHasCompletedSurvey);

app.put('/api/users/:id/location', users.updateUserLocation);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '../..' + '/client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
