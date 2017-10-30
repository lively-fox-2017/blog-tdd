'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

router.post('/signup', controllers.User.signup);

router.post('/signin', controllers.User.signin);

module.exports = router;