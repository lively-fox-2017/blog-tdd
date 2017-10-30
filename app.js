'use strict'

require('dotenv').config();

const express = require('express');
const multer  = require('multer');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, console.log(`${process.env.NODE_ENV} server running on port ${port}`));

module.exports = app;