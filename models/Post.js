var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

var commentSchema = new Schema({
  'user' : {type: Schema.Types.ObjectId, ref:'User'},
  'comment' : String
});

var newSchema = new Schema({
  'user' : {type: Schema.Types.ObjectId, ref:'User'},
  'title' : String,
  'content' : String,
  'img_url' : String,
  'comments' : [commentSchema],
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('create', function(next){
  this.comments = []
  next();
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Post', newSchema);
