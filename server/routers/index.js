const express = require('express');
const router = express.Router()
const multer = require('multer')
const upload = multer({
  dest: 'assets/img/'
})
const Blog = require('../controllers/index')

router.get('/', Blog.getData)

router.post('/', upload.single('img'),  Blog.saveData)

module.exports = router
