const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
    } else {
      User.find({})
        .then((users) => {
          res.status(200).json(users);
        })
    }
  }

  static updateUser(req, res, next) {
    User.findOneAndUpdate({
        userID: req.params.userID
      }, req.body, {
        new: true
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static authUser(req, res, next) {
    User.findOneAndUpdate({
      userID: req.body.userID
    }, {
      lastLogin: new Date()
    }, {
      upsert: true,
      setDefaultsOnInsert: true
    }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      }
      let token = jwt.sign({
        userID: req.body.userID,
        name: req.body.userID,
        email: req.body.userID
      }, process.env.SECRET)
      res.status(200).json({
        lastLogin: user ? user.lastLogin : null,
        token: token
      });
    })
  }
}

module.exports = UserCtrl;
