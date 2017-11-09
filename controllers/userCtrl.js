const User = require('../models/user');
const jwt = require('jsonwebtoken');
var FB = require('fb');

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
    let fb = new FB.Facebook({
      accessToken: req.headers.accesstoken,
      appId: process.env.FBAPPID,
      appSecret: process.env.FBSECRET
    });
    fb.api(req.headers.userid, {
      fields: ['id', 'name', 'email']
    }, function (results) {
      User.findOneAndUpdate({
        userID: req.headers.userid
      }, {
        userID: results.id,
        name: results.name,
        email: results.email,
        lastLogin: new Date()
      }, {
        upsert: true,
        setDefaultsOnInsert: true
      }, function (err, user) {
        if (err) {
          console.error(err);
          res.status(400).json(err);
        }
        console.log(user);
        let token = jwt.sign({
          _id: user._id,
          userID: user.userID,
          name: user.name,
          email: user.email
        }, process.env.SECRET)
        res.status(200).json({
          lastLogin: user ? user.lastLogin : null,
          token: token
        });
      })
    })
  }
}

module.exports = UserCtrl;
