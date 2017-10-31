'use strict'

const express = require('express');
const controllers = require('./../controllers');
const isUser = require('./../helpers/is-user');

const router = express.Router();

router.get('/', controllers.Post.readAllPosts);

router.post('/', isUser, controllers.Post.create);

router.put('/:id', isUser, controllers.Post.update);

router.delete('/:id', isUser, controllers.Post.delete);

module.exports = router;