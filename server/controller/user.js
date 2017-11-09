const token = require('../helper/jwt');
const genSalt=require('../helper/saltGen');
const createHash=require('../helper/hash');
// const signinFB = require('../models/signinFB');
const user = require('../models/user');

class User {
  static findAll(req,res,next){
    user.find({
    })
    .then(rows=>{
      res.status(200).json(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static signin(req,res,next){
    if (req.body.username=='' || req.body.password=='') {
      res.status(400).send('username/password anda kosong!')
    } else {
      user.findOne({
        username:req.body.username
      })
      .then(rows=>{
        if (rows.password==createHash(req.body.password,rows.salt)) {
          res.json({
            message:"Login sukses",
            token:token.create({
              userId:rows._id,
              username:rows.username,
              role:rows.role,
              imageUrl: rows.imageUrl,
            }),
            role:rows.role
          })
        } else {
          res.status(400).send('Maaf password anda salah!')
        }
      })
      .catch(err=>{
        // res.status(400).send('Maaf user anda tidak terdaftar!')
        res.status(400).send(err)
      })
    }
  }
  static signup(req,res){
    let salt=genSalt();
    user.create({
      username:`${req.body.username}`,
      password:`${createHash(req.body.password,salt)}`,
      email:`${req.body.email}`,
      imageUrl:`${req.body.imageUrl}`,
      // role:`${req.body.role}`,
      role:`user`,
      salt:`${salt}`,

    })
    .then((rows)=>{
      res.json({"message":"Signup sukses",
      "data":rows});
    })
    .catch(err=>{
      res.send(err);
    })
  }
}

module.exports = User
