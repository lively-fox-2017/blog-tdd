const mongoose = require('mongoose');
mongoose.connection.openUri(`${process.env.APPDB}`,(err)=>{
  if (err) {
    console.log(err);
  }
});
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username  : { type:String },
    password  : { type:String },
    salt      : { type:String },
    email     : { type:String },
    imageUrl  : { type:String, default:'' },
    role      : { type:String },
});

module.exports = mongoose.model('Users', UserSchema);
