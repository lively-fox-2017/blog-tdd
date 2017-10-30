const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/ArticleController');

router.get('/', ArticleController.fetchAll);
router.post('/', ArticleController.create);

module.exports = router;
