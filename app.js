'use strict'

require('dotenv').config();

const express = require('express');
const multer  = require('multer');

const app = express();

app.listen(process.env.PORT || 3000, console.log(`server running on port ${port}`));