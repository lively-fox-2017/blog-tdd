var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

  var Blog = new Schema({
    title:String,
    content:String,
    image:String
  })

var dataBlog = mongoose.model('dataBlog',Blog)

module.exports = dataBlog