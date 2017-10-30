const express = require('express');
const router = express.Router();
const controller = require('../controllers/post');

router.post('/', controller.post);

module.exports = router;
