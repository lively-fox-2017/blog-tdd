const mongoose = require('mongoose');
mongoose.connection.openUri(`${process.env.APPDB}`,(err)=>{
  if (err) {
    console.log(err);
  }
});
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title : {type:String},
  content : {type:String},
  author : {type:String},
  imageUrl  : {type:String}
});

module.exports = mongoose.model('Blog', blogSchema);
