const mongoose = require('mongoose');
const URI = 'mongodb://localhost/blog_tdd_vue'
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

mongoose.connect(URI, {useMongoClient: true})

var blog = new Schema({
  title: String,
  description: String,
  date: String,
  author: String,
  image: String,
  slug: String
})

var Blog = mongoose.model('Blog', blog)

function getBlog(head, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      Blog.find({
        author: decoded.username
      }, (err, blog) => {
        if(!err){
          cb(blog, null)
        }else{
          res.status(200).send(err)
        }
      })
    }else{
      let login = 'Login Dulu!'
      cb(null, login)
    }
  })
}

function saveBlog(head, body, file, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      let title = body.title
      let slug = title.split(' ').join('-')
      let date = new Date()
      let dateStr = date.toDateString()
      let blogSchema = new Blog({
        title: title,
        description: body.desc,
        date: dateStr,
        author: decoded.username,
        image: file.path,
        slug: slug
      })
      blogSchema.save((err, blog) => {
        if(!err){
          cb(blog)
        }else{
          res.status(200).send(err)
        }
      })
    }
  })
}

module.exports = {
  getBlog,
  saveBlog
}
