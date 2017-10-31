'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');

const app = express();

const index = require('./routes/index');
const post = require('./routes/post');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/post', post);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`${process.env.NODE_ENV} server running on port ${port}`));

module.exports = app;