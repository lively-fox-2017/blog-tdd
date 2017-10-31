const mongoose = require('mongoose');
const slug = require('slug')
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(`mongodb://localhost:27017/blog_${process.env.NODE_ENV}`);

let articleSchema = new Schema({
  slug: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

articleSchema.pre('save', function(next) {
  mongoose.models.Article
    .count({
      title: this.title
    })
    .then((count) => {
      console.log('jumlah', count);
      if (count > 0) {
        this.slug = slug(this.title + '-' + (parseInt(count) + 1), {
          lower: true
        });
      } else {
        this.slug = slug(this.title, {
          lower: true
        });
      }
      next()
    })
})

articleSchema.pre('update', function(next) {
  this.findOne({
      slug: this._conditions.slug
    })
    .then(value => {
      this.updateOne({
          slug: this._conditions.slug
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
