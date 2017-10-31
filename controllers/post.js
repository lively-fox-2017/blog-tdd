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

  static create(req, res) {
    let post = req.body;
    post.author = req.headers.user.id;
    models.Post.create(post)
    .then(postCreated => {
      const resp = generateResponse(200, 'post created', postCreated, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      if (err.errors.title && err.errors.title.kind === 'required') {
        const resp = generateResponse(406, 'missing title (required)', null, err);
        res.status(406).send(resp);
      } else if (err.errors.text && err.errors.text.kind === 'required') {
        const resp = generateResponse(406, 'missing text (required)', null, err);
        res.status(406).send(resp);
      } else {
        const resp = generateResponse(500, 'failed to create post', null, err);
        res.status(500).send(resp);
      }
    });
  }

  static update(req, res) {
    const options = { _id: req.params.id };
    const value = req.body;

    models.Post.updateOne(options, value).exec()
    .then(updateInfo => {
      if (updateInfo.n === 0) {
        const resp = generateResponse(404, 'invalid post id. Nothing updated', null, updateInfo);
        res.status(404).send(resp);
      } else {
        const resp = generateResponse(200, `update post with id ${req.params.id}`, updateInfo, null);
        res.status(200).send(resp);
      }
    })
    .catch(err => {
      const resp = generateResponse(500, `failed to update post with id ${req.params.id}`, null, err);
      res.status(500).send(resp);
    });
  }

  static delete(req, res) {
    const options = {_id: req.params.id};

    models.Post.deleteOne(options)
    .then(deleteInfo => {
      if (deleteInfo.result.n === 0) {
        const resp = generateResponse(404, 'invalid post id. Nothing deleted', null, deleteInfo);
        res.status(404).send(resp);
      } else {
        const resp = generateResponse(200, `delete post with id ${req.params.id}`, deleteInfo, null);
        res.status(200).send(resp);
      }
    })
    .catch(err => {
      const resp = generateResponse(500, `failed to delete item with id ${req.params.id}`, null, err);
      res.status(200).send(resp);
    });
  }
}

module.exports = Post;