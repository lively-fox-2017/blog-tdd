const jwtprocessor = require('../helpers/jwtprocessor');
const Models = require('../models/all-models');
const mongoose = require('mongoose');

module.exports = class Controller{
    static post(req, res){
      let post = {
        title:req.body.title,
        content:req.body.content
      }

      jwtprocessor.verify(req.body.token)
      .then(response=>{

        post.user = mongoose.Types.ObjectId(response.id);
        return Models.Post.create(post)
      })
      .then(createdPost=>{
        res.send({message:'berhasil', post:createdPost})
      })
      .catch(err=>{
        res.send({message:'gagal', err})
      })
    }

    static update(req, res){
      let postId = mongoose.Types.ObjectId(req.body.postId);

      jwtprocessor.verify(req.body.token)
      .then(response=>{
        let user = mongoose.Types.ObjectId(response.id);
        return Models.Post.findOne({_id:postId, user})
      })
      .then(post=>{
        if(post){
          post.title = req.body.title;
          post.content = req.body.content;
          return post.save()
        }else{
          throw 'post not found'
        }
      })
      .then(savedPost=>{
        res.send({message:'berhasil', post:savedPost})
      })
      .catch(err=>{
        res.send({message:'gagal', err})
      })
    }

    static getAll(req, res){
      let token = req.params.token;
      jwtprocessor.verify(token)
      .then(response=>{
        let user = mongoose.Types.ObjectId(response.id);
        return Models.Post.find({user})
      })
      .then(posts=>{
        res.send({message:'berhasil', posts})
      })
      .catch(err=>{
        res.send({message:'gagal', err})
      })
    }

    static delete(req,res){
      let token = req.body.token;
      let id = req.body.id
      jwtprocessor.verify(token)
      .then(response=>{
        let user = mongoose.Types.ObjectId(response.id);
        return Models.Post.remove({_id:id, user})
      })
      .then(posts=>{
        res.send({message:'berhasil'})
      })
      .catch(err=>{
        console.log(err);
        res.send({message:'gagal', err})
      })
    }
};
