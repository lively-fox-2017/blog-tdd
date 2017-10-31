const Article = require('../models/Article');

const deleteAllArticle = () => {

  Article
    .deleteMany({})
    .then(() => {
      console.log('Cleared `articles` collection');
    });

}

module.exports = deleteAllArticle;
