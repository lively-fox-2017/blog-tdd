const express = require('express');
const router = express.Router();

const articleRoutes = require('./articles');

router.use('/articles', articleRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'blog-tdd API index'
  });
});

module.exports = router;
