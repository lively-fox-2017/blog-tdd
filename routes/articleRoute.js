const express = require('express');
const router = express.Router();

const ArticleCtrl = require('../controllers/articleCtrl');

router.get('/get_article/:articleID?', ArticleCtrl.getArticles);

module.exports = router;
