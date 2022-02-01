require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://Blue-Ocean.firebaseio.com'
});

