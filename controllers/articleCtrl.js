const Article = require('../models/article');
const User = require('../models/user');

class ArticleCtrl {
  static postArticle(req, res, next) {
    Article.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      coverImage: req.file.cloudStoragePublicUrl
    })
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static deleteArticle(req, res, next) {
    Article.findOneAndRemove({
      _id: req.params.articleId
    })
      .then((deleted) => {
        res.status(200).json(deleted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static updateArticle(req, res, next) {
    console.log('here');
    Article.findOneAndUpdate({
      slug: req.params.slug
    }, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      coverImage: req.file.cloudStoragePublicUrl
    }, {
      new: true
    })
      .then((article) => {
        res.status(200).json(article)
      })
      .catch((err) => {
        res.status(400).json(err)
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
