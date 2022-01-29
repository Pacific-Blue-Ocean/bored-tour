require('dotenv').config();
const path = require('path');
const express = require('express');
const { friends, preferences } = require("./controllers");
const middleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/public'));
app.use(express.json());
app.use(middleware.logger);

app.get('/api/friends', friends.getFriends);

app.get('/api/survey', preferences.getSurvey);
app.post('/api/users/:id/preferences', preferences.postUserPreferences);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '../..' + '/client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
