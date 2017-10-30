const Blog = require('../models/blog')

class BlogCtrl {
  static create(req, res, next) {
    Blog.create(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
}

module.exports = BlogCtrl;
