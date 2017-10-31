const Article = require('../models/article');
const User = require('../models/user');

class ArticleCtrl {
  static postArticle(req, res, next) {
    User.findOne({
        userID: req.body.author
      })
      .then((user) => {
        if (user) {
          req.body.author = user._id;
          Article.create(req.body)
            .then((inserted) => {
              res.status(201).json(inserted);
            })
            .catch((err) => {
              res.status(400).json(err);
            })
        } else {
          res.status(204).json({});
        }
      })
  }

  static getArticles(req, res, next) {
    if (req.params.slug) {
      Article.find({
          slug: req.params.slug
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
