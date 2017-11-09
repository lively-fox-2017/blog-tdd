const jwt = require('jsonwebtoken');
require('dotenv').config()

var auth = (req,res,next) => {
  jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
    if (!err) {
      req.username = decoded.username
      next()
    }
    else {
      res.send(err)
    }
  })
}

module.exports = {
  auth
};
