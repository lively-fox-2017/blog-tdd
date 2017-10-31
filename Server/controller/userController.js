const helper = require('../helpers/helper')
const User = require('../models/user')

module.exports = {
  register: (req, res) => {
    // let secret = helper.secretKeyGen()
    let password = helper.secretHash(req.body.secret, req.body.password)
    // console.log(res.body);
    User.create(helper.dataUser(req.body, req.body.secret, password))
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Register",
        data: result
      })
    }).catch((reason) => {
      res.status(409).json({
        message: reason
      })
    })
  },

  login: (req, res) => {
    User.findOne({username: req.body.username}).then((result) => {
      if (result) {
        let secret = result.secret
        let password = helper.secretHash(secret, req.body.password)
        // console.log("ini "+password);
        // console.log("itu "+result.password);
        if(result.password === password) {
          // console.log("ni token ", process.env.token_secret);
          let token = helper.authentication(result)
          res.status(200).json({
            message: "Berhasil Login",
            token: token
          })
        } else {
          res.status(401).json({
            message: "Sorry, wrong password"
          })
        }
      } else {
        res.status(401).json({
          message: "Sorry, wrong username"
        })
      }
    }).catch((reason) => {
      res.status(500).json({
        message: reason
      })
    })
  }
}
