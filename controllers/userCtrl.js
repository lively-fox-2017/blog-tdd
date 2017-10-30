const User = require('../models/user');

class UserCtrl {
  static addUser(req, res, next) {
    User.create(req.body)
      .then((inserted) => {
        res.status(200).json(inserted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static getUsers(req, res, next) {
    if (req.params.userID) {
      User.find({
          userID: req.params.userID
        })
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          res.status(400).json(err);
        })
    } else {
      User.find({})
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          res.status(400).json(err);
        })
    }
  }
}

module.exports = UserCtrl;
