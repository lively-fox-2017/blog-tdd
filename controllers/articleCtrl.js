const Article = require('../models/article');

class ArticleCtrl {
  static getArticles(req, res, next) {
    if (req.params.articleID) {
      Article.find({
          articleID: req.params.articleID
        })
        .then((articles) => {
          res.status(200).json(articles);
        })
    } else {
      Article.find({})
        .then((articles) => {
          res.status(200).json(articles);
        })
    }
  }

}

module.exports = ArticleCtrl;
