const express = require('express')
const router = express.Router()
const blog = require('../controllers/blog')

router.post('/post', blog.blogCreate)
router.get('/',blog.blogView)
router.put('/:id',blog.blogEdit)
router.delete('/:id',blog.blogDelete)

module.exports = router
