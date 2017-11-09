const blog = require('../models/blog');

class Blog {
  static find(req,res){
    blog.find({})
    .then(rows=>{
      res.status(200).json({
        message:"data showed",
        data:rows})
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static add(req,res){
    blog.create({
      title:req.body.title,
      content:req.body.content,
      author:req.body.author,
      imageUrl  : req.body.imageUrl
    })
    .then(rows=>{
      res.status(200).json({
        message:"adding data succesfull",
        data:rows
      })
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static findById(req,res){
    // console.log(req.params.id);
    blog.findOne({
      _id:req.params.id
    })
    .then(rows=>{
      res.status(200).json({
        message:"data showed",
        data:rows})
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static edit(req,res){
    blog.findOneAndUpdate({
      _id:req.params.id
    },{
      title:req.body.title,
      content:req.body.content,
      author:req.body.author,
      imageUrl  : req.body.imageUrl
    })
    .then(rows=>{
      res.status(200).json({
        message:"updating data succesfull",
        data:rows
      })
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static delete(req,res){
    blog.findOneAndRemove({
      _id:req.params.id
    })
    .then(rows=>{
      res.status(200).json({
        message:"deleting data succesfull",
        data:rows
      })
    })
  }
}

module.exports = Blog
