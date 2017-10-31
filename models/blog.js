const mongoose = require('mongoose')
const idvalidator = require('mongoose-id-validator');
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})
blogSchema.plugin(idvalidator)
var Blog = mongoose.model('Blog', blogSchema)

class Model {
  static create(insert) {
    return new Promise((resolve, reject) => {
      Blog.create({
        title: insert.title,
        content: insert.content,
        author: insert.author,
        imageUrl: insert.imageUrl
      }).then((inserted) => {
        resolve(inserted)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static read() {
    return new Promise((resolve, reject)=>{
      Blog.find().then((data)=>{
        resolve(data)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject)=>{
      Blog.findOne({"_id":id}).then((data)=>{
        resolve(data)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  static readByUserId(id) {
    return new Promise((resolve, reject)=>{
      Blog.find({author:id}).then((data)=>{
        resolve(data)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  static delete(id) {
    return new Promise((resolve, reject)=>{
      Blog.findOneAndRemove({"_id":id}).then((data)=>{
        resolve(data)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  static update(update) {
    return new Promise((resolve, reject)=>{
      Blog.findOneAndUpdate({"_id":update._id}, update, {new:true}).then((updated)=>{
        resolve(updated)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  static clear() {
    return new Promise((resolve, reject) => {
      Blog.remove({}).then((removed) => {
        resolve(removed)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = Model;
