const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blogtdd')

let schema = new mongoose.Schema({
  username:'string',
  password:'string',
  email:'string'
})

var user = mongoose.model('user',schema)

module.exports = user
