'use strict'

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: { type: Schema.Types.ObjectId, ref: 'User' },
    required: true
  },
  featured_image_url: {
    type: String
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);