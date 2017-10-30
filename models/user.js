const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(`mongodb://localhost:27017/blog_${process.env.NODE_ENV}`);

let userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

userSchema.pre('update', function(next) {
  this.findOne({
      userID: this._conditions.userID
    })
    .then(value => {
      this.updateOne({
          userID: this._conditions.userID
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


module.exports = mongoose.model('User', userSchema);
