const user = require('../models/signup')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

  static dataEmailUnique(req, res){
    user.emailUnique(req.params, (result) => {
      res.send(result)
    })
  }

  static dataUserUnique(req, res){
    user.userUnique(req.params, (result) => {
      res.send(result)
    })
  }

  static saveData(req, res){
    user.saveUser(req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = User
