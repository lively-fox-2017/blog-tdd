const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blogtdd')

let schema = new mongoose.Schema({
  judul:'string',
  isi:'string',
  author:'string'
})

var artikel = mongoose.model('artikel',schema)

module.exports = artikel
