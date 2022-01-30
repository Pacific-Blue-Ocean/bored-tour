require('dotenv').config();
const path = require('path');
const express = require('express');
const middleware = require('./middleware');
// controllers
const events = require('./controllers/events');
const friends = require("./controllers/friends");
const preferences = require("./controllers/preferences");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/public'));
app.use(express.json());
app.use(middleware.logger);

app.get('/api/events', events.getEvents);

app.get('/api/friends', friends.getFriends);
app.post('/api/friends', friends.addFriend);
app.delete('/api/friends', friends.removeFriend);

app.get('/api/preferences', preferences.getSurvey);
app.post('/api/users/:id/preferences', preferences.postUserPreferences);
app.get('/api/users/:id/preferences', preferences.getUserPreferences);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '../..' + '/client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
