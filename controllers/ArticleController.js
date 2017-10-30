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

  fetchById: (req, res) => {
    Article
      .findById(req.params.id)
      .then((article) => {

        if (!article)
          res.status(404).json({});
        else
          res.status(200).json(article);

      })
      .catch((err) => {

        if (err.name === 'CastError')
          res.status(404).json({});
        else
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
  },

  update: (req, res) => {
    Article
      .findById(req.params.id)
      .then((article) => {

        if (!article) {
          res.status(404).json({});
        } else {

          Article
            .updateOne(
              { _id: req.params.id },
              {
                title: req.body.title,
                content: req.body.content,
                excerpt: req.body.excerpt,
                slug: req.body.slug,
                featured_image: req.body.featured_image,
                author: req.body.author
              },
              { runValidators: true }
            )
            .then((status) => {
              res.status(200).json(article);
            })
            .catch((err) => {
              res.status(400).json(err);
            });

        }

      })
      .catch((err) => {

        if (err.name === 'CastError')
          res.status(404).json({});
        else
          res.status(400).json(err);

      });
  },

  delete: (req, res) => {
    Article
      .findById(req.params.id)
      .then((article) => {

        if (!article) {
          res.status(404).json({});
        } else {

          Article
            .deleteOne({ _id: req.params.id })
            .then((status) => {
              res.status(200).json(article);
            })
            .catch((err) => {
              res.status(400).json(err);
            });

        }

      })
      .catch((err) => {

        if (err.name === 'CastError')
          res.status(404).json({});
        else
          res.status(400).json(err);

      });
  }
};

module.exports = ArticleController;
