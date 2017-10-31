const express = require('express');
const router = express.Router();

const ArticleCtrl = require('../controllers/articleCtrl');

router.get('/get_article/:articleID?', ArticleCtrl.getArticles);
router.get('/get_user_article/:userID', ArticleCtrl.getUserArticles);

module.exports = router;
