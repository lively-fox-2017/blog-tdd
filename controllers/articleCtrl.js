const Article = require('../models/article');
const User = require('../models/user');

class ArticleCtrl {
  static getArticles(req, res, next) {
    if (req.params.articleID) {
      Article.find({
          articleID: req.params.articleID
        })
        .populate(['author'])
        .then((articles) => {
          res.status(200).json(articles);
        })
    } else {
      Article.find({})
        .populate(['author'])
        .then((articles) => {
          res.status(200).json(articles);
        })
    }
  }

  static getUserArticles(req, res, next) {
    User.findOne({
        userID: req.params.userID
      })
      .then((user) => {
        if (user) {
          Article.find({
              author: user._id
            })
            .populate(['author'])
            .then((articles) => {
              res.status(200).json(articles);
            })
        } else {
          res.status(204).json({});
        }
      })
  }

}

module.exports = ArticleCtrl;
