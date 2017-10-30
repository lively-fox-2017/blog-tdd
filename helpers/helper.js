const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

module.exports = {
  mongoAuth: {
    auth: {
      authdb: 'admin'
    }
  },

  dataUser: (reqBody, secret, password) => {
    let obj = {
      username: reqBody.username,
      password: password,
      role: "user",
      secret: secret,
      email: reqBody.email
    }

    return obj
  },

  dataArticle: (reqBody) => {
    let obj = {
      user: reqBody.user,
      judul: reqBody.judul,
      deskripsi: reqBody.deskripsi,
      createdAt: new Date(),
      updatedAt: null,
    }

    return obj
  },

  // secretKeyGen: function(){
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  //   let secret = ""
  //
  //   for(let i = 0; i < 6; i++) {
  //     secret += str[Math.floor(Math.random()*62)]
  //   }
  //
  //   return secret
  // },
  //
  secretHash: function(key, password) {
    const hash = crypto.createHmac('md5', key).update(password).digest('hex');

    return hash;
  },

  authentication: (input) => {
    let token = jwt.sign({
      _id: input._id,
      username: input.username
    }, process.env.token_secret);

    return token
  },

  authorization: (input) => {
    let decode = jwtDecode(input)

    decode = decode._id

    return decode
  }
}
