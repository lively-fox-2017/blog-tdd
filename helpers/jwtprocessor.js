const jwt = require('jsonwebtoken');

const secret = process.env.JWTTOKEN || 'nncrawlerRocks';

class Jwtprocessor{
  static sign(data, callback){
    return jwt.sign(data, secret, callback)
  }
  static verify(token){
    return new Promise(function(resolve, reject){
      jwt.verify(token, secret, function(err, decoded){
        if (err) {reject(err)} else {resolve(decoded)}
      })
    })

  }
}

module.exports = Jwtprocessor;
