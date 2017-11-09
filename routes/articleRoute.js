const express = require('express');
const router = express.Router();

const files = require('../helpers/files')
const upload = files.multer.single('image')
const ArticleCtrl = require('../controllers/articleCtrl');

router.post('/post_article/', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        error: 'err'
      })
    }
    // Proceed to GCP
    next()
  })
}, files.sendUploadToGCS, ArticleCtrl.postArticle);
router.put('/update_article/:slug', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        error: 'err'
      })
    }
    // Proceed to GCP
    next()
  })
}, files.deleteFileGCS, files.sendUploadToGCS, ArticleCtrl.updateArticle)
router.get('/get_article/:slug?', ArticleCtrl.getArticles);
router.get('/get_user_article/:userID', ArticleCtrl.getUserArticles);
router.delete('/delete_article/:articleId', ArticleCtrl.deleteArticle);

module.exports = router;
