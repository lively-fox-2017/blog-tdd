const express = require('express');
const router = express.Router();

const ArticleCtrl = require('../controllers/articleCtrl');

router.post('/post_article/', ArticleCtrl.postArticle);
router.get('/get_article/:slug?', ArticleCtrl.getArticles);
router.get('/get_user_article/:userID', ArticleCtrl.getUserArticles);

module.exports = router;
