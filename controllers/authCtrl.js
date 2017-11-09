const User = require('../models/user')

class AuthCtrl {
  static register(req, res, next) {
    User.create(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static login(req, res, next) {
    User.login(req.body.username, req.body.password).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
}

module.exports = AuthCtrl;
