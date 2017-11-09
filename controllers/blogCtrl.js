const Blog = require('../models/blog')

class BlogCtrl {
  static create(req, res, next) {
    req.body.imageUrl = req.file.cloudStoragePublicUrl
    Blog.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static read(req, res, next) {
    Blog.read().then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static update(req, res, next) {
    req.body._id = req.params.id;
    if (req.file) {
      req.body.fileUrl = req.file.cloudStoragePublicUrl
    }
    Blog.update(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static delete(req, res, next) {
    Blog.delete(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readOne(req, res, next) {
    Blog.readOne(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readByUserId(req, res, next) {
    Blog.readByUserId(req.params.user_id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = BlogCtrl;
