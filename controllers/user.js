const Models = require('../models/all-models');
const jwtprocessor = require('../helpers/jwtprocessor');

module.exports = class Controller{
  static register(req, res){
    const request = {
      email:req.body.email,
      username:req.body.username,
      password:req.body.password
    }
    Models.User.create(request).then(user=>{
      res.send({message:'berhasil'})
    })
    .catch(err=>{
      res.send({message:'gagal', err})
    })
  }

  static login(req,res){
    const request = {
      email:req.body.email,
      password:req.body.password
    }

    Models.User.findOne(request)
    .then(user=>{
      if(user){
        console.log(user);
        jwtprocessor.sign({email:user.email, username:user.username, id:user._id}, function(err, token){
          if(err){
            throw err
          }else{
            res.send({message:'berhasil', token:token})
          }
        })
      }else{
        throw 'user not found'
      }
    })
    .catch(err=>{
      console.log(err);
      res.send({message:'gagal'})
    })
  }
};
