const mongoose = require('mongoose');
const URI = 'mongodb://localhost/blog_tdd_vue'
const bcrypt = require('bcrypt')
const saltRounds = 8
const Schema = mongoose.Schema

mongoose.connect(URI, {useMongoClient: true})

var user = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  salt: String
})

var User = mongoose.model('User', user)

function getUser(cb){
  User.find({}, (err, user) => {
    if(!err){
      cb(user)
    }else{
      res.status(200).send(err)
    }
  })
}

function emailUnique(params, cb){
  User.find({
    email: params.email
  }, (err, user) => {
    if(!err){
      cb(user)
    }else{
      res.status(200).send(err)
    }
  })
}

function userUnique(params, cb){
  User.find({
    username: params.username
  }, (err, user) => {
    if(!err){
      cb(user)
    }else{
      res.status(200).send(err)
    }
  })
}

function saveUser(body, cb){
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.pass, salt, (err, hash) => {
      if(!err){
        let userSchema = new User({
          email: body.email,
          username: body.user,
          password: hash,
          salt: hash
        })
        userSchema.save((err, user) => {
          if(!err){
            cb(user, null)
          }else if(err){
            if(err.errmsg.indexOf('email_1') !== -1){
              let errorEmail = `Email already used!`
              cb(null, errorEmail)
            }else if(err.errmsg.indexOf('username_1') !== -1){
              let errorUser = `Username already used!`
              cb(null, errorUser)
            }
          }
        })
      }else{
        res.status(200).send(err)
      }
    })
  })
}

module.exports = {
  User,
  getUser,
  emailUnique,
  userUnique,
  saveUser
}
