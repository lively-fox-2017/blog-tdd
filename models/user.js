const mongoose = require('mongoose')
const encrypt = require('../helpers/cryptoHelper')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0-shard-00-00-jlkah.mongodb.net:27017,cluster0-shard-00-01-jlkah.mongodb.net:27017,cluster0-shard-00-02-jlkah.mongodb.net:27017/blogtdd_development?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
  useMongoClient: true
})
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
var userSchema = new Schema({
  username: {
    type: String,
    unique:true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

var User = mongoose.model('User', userSchema)

class Model {
  static create(insert) {
    const hash = encrypt(insert.password)
    return new Promise((resolve, reject) => {
        User.create({
          name:insert.name,
          username:insert.username,
          email:insert.email,
          password:hash
        }).then((inserted) => {
          resolve(inserted)
        }).catch((err) => {
          reject(err)
        })
      })
    }
    static read() {
      return new Promise((resolve, reject)=>{
        User.find({}).then((data)=>{
          resolve(data)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
    static readOne(id) {
      return new Promise((resolve, reject)=>{
        User.findOne({"_id":id}).then((data)=>{
          resolve(data)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
    static delete(id) {
      return new Promise((resolve, reject)=>{
        User.findOneAndRemove({"_id":id}).then((data)=>{
          resolve(data)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
    static update(update) {
      return new Promise((resolve, reject)=>{
        User.findOneAndUpdate({"_id":update._id},update, {new:true}).then((data)=>{
          resolve(data)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
    static login(username, password) {
      return new Promise((resolve, reject)=>{
        User.findOne({username:username}).then((data)=>{
          var hash = encrypt(password);
          if(hash == data.password){
            var token = jwt.sign({ username: data.username, _id:data._id }, process.env.JWT_KEY);
            resolve({token})
          }
          reject({message:'gagal login'})
        }).catch((err)=>{
          reject(err)
        })
      })
    }
    static clear() {
      return new Promise((resolve, reject)=>{
        User.remove({}).then((removed)=>{
          resolve(removed)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
  }

  module.exports = Model;
