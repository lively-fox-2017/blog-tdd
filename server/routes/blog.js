const express = require('express')
const router = express.Router()
const Blog = require('../controllers/blog')

router.get('/',Blog.get)

router.post('/',Blog.post)

router.put('/:id',Blog.update)

router.delete('/:id',Blog.deletenews)

module.exports = router;
