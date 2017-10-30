const Article = require('../models/Article');

const fetchAll = (req, res) => {
  Article.find({})
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  fetchAll
};
