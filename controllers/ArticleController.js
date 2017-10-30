const Article = require('../models/Article');

const ArticleController = {
  fetchAll: (req, res) => {
    Article.find({})
      .then((articles) => {
        res.status(200).json(articles);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  create: (req, res) => {
    Article.create({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      slug: req.body.slug,
      featured_image: req.body.featured_image,
      author: req.body.author
    })
      .then((article) => {
        res.status(201).json(article);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = ArticleController;
