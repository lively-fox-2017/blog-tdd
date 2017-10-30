'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');

const app = express();

const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`${process.env.NODE_ENV} server running on port ${port}`));

module.exports = app;