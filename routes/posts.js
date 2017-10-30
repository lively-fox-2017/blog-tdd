const express = require('express');
const router = express.Router();
const controller = require('../controllers/post');

router.post('/', controller.post);
router.get('/:token', controller.getAll);

module.exports = router;
