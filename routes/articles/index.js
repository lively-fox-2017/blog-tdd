const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/ArticleController');

router.get('/', ArticleController.fetchAll);
router.get('/:id', ArticleController.fetchById);
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);

module.exports = router;
