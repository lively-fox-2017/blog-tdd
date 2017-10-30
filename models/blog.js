const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blogtdd_' + process.env.NODE_ENV, {
  useMongoClient: true
})
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
var blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

var Blog = mongoose.model('Blog', blogSchema)

class Model {
  static create(insert) {
    return new Promise((resolve, reject) => {
        Blog.create({
          title: insert.title,
          content: insert.content,
          author: insert.author
        }).then((inserted) => {
          resolve(inserted)
        }).catch((err) => {
          reject(err)
        })
      })
    }
    static clear() {
      return new Promise((resolve, reject)=>{
        Blog.remove({}).then((removed)=>{
          resolve(removed)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
  }

  module.exports = Model;
