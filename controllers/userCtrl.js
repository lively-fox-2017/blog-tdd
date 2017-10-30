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
}

module.exports = UserCtrl;
