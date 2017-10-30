const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(`mongodb://localhost:27017/blog_${process.env.NODE_ENV}`);

let articleSchema = new Schema({
  articleID: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

articleSchema.pre('update', function(next) {
  this.findOne({
      articleID: this._conditions.articleID
    })
    .then(value => {
      this.updateOne({
          articleID: this._conditions.articleID
        }, {
          updatedAt: Date.now()
        })
        .then(() => {
          next();
        })
        .catch(reason => {
          console.log(reason);
        });
    })
    .catch(reason => {
      console.log(reason);
    })
})


module.exports = mongoose.model('Article', articleSchema);
