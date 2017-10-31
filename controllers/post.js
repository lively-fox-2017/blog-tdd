'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class Post {
  static readAllPosts(req, res) {
    models.Post.find().exec()
    .then(posts => {
      const resp = generateResponse(200, 'read all posts', posts, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to read all posts', null, posts);
      res.status(500).send(resp)
    });
  }
}

module.exports = Post;