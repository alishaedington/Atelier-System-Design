const express = require('express');
const cors = require('cors');
const router = require('./routes');

// create server that can be used for Jest testing and when running app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

module.exports = app;
