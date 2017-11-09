const jwt = require('jsonwebtoken');

class Token {
  static create(data){
    return jwt.sign(data,process.env.APPSECRET)
  }
  static verify(data){
    return jwt.verify(data,process.env.APPSECRET)
  }
}

module.exports = Token
