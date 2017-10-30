const express = require('express')
const router = express.Router()
const BlogCtrl = require('../controllers/blogCtrl')

router.post('/', BlogCtrl.create);

module.exports = router;
