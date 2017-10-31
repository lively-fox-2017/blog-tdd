'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

router.get('/', controllers.Post.readAllPosts);

module.exports = router;