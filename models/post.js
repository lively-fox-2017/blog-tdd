'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featured_image_url: {
    type: String
  }
});

module.exports = mongoose.model('Post', postSchema);