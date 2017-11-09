const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const idvalidator = require('mongoose-id-validator');
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0-shard-00-00-jlkah.mongodb.net:27017,cluster0-shard-00-01-jlkah.mongodb.net:27017,cluster0-shard-00-02-jlkah.mongodb.net:27017/blogtdd_development?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
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
      var decoded = jwt.verify(insert.author, process.env.JWT_KEY)
      insert.author = decoded._id
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
    return new Promise((resolve, reject) => {
      Blog.find().then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Blog.findOne({
        "_id": id
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readByUserId(id) {
    return new Promise((resolve, reject) => {
      var decoded = jwt.verify(id, process.env.JWT_KEY)
      id = decoded._id
      Blog.find({
        author: id
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id) {
    return new Promise((resolve, reject) => {
      Blog.findOneAndRemove({
        "_id": id
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update) {
    return new Promise((resolve, reject) => {
      Blog.findOneAndUpdate({
        "_id": update._id
      }, update, {
        new: true
      }).then((updated) => {
        resolve(updated)
      }).catch((err) => {
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
