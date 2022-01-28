require('dotenv').config();
const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const middleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/public'));
app.use(express.json());
app.use(middleware.logger);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '../..' + '/client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
