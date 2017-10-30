const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(`mongodb://localhost:27017/blog_${process.env.NODE_ENV}`);

let userSchema = new Schema({
  userID: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', userSchema);
