const User = require('../models/user')

class UserCtrl {
  static create(req, res, next) {
    User.create(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static read(req, res, next) {
    User.read(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static readOne(req, res, next) {
    User.readOne(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static update(req, res, next) {
    req.body._id = req.params.id
    User.update(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static delete(req, res, next) {
    User.delete(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
}

module.exports = UserCtrl;
