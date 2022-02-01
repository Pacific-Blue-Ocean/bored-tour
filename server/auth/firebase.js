require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

const app = initializeApp();
var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://Blue-Ocean.firebaseio.com'
});


