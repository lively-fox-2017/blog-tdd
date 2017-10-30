const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myBlog');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var articleSchema = new Schema({
    title: String,
    content: String,
    author: String,
    createdAt: Date,
    image: String
});
var Article = mongoose.model('Article', articleSchema);
module.exports = Article