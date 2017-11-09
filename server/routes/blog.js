const express = require('express');
const router = express.Router();
const blog = require('../controller/blog');

router.get('/',blog.find);
router.post('/',blog.add);
router.get('/:id',blog.findById);
router.put('/:id',blog.edit);
router.delete('/:id',blog.delete);

module.exports = router;
