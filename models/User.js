require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connection.openUri(process.env.MONGO_URL + '_' + process.env.NODE_ENV);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

// Middlewares
UserSchema.pre('save', function (next) {

  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();

});

module.exports = mongoose.model('User', UserSchema);
