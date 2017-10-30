const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/ArticleController');

router.get('/', ArticleController.fetchAll);

module.exports = router;
