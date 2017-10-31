const Blog = require('../models/blog')

let blogCreate = (req,res)=>{
  Blog.create({
    author : req.body.author,
    title : req.body.title,
    content: req.body.content
  },function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let blogView = (req,res)=>{
  Blog.find({},function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let blogEdit = (req,res)=>{
  Blog.updateOne({_id:req.params.id},{
    author : req.body.author,
    title : req.body.title,
    content: req.body.content
  },function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let blogDelete = (req,res)=>{
  Blog.remove({_id:req.params.id},function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

module.exports = {
  blogCreate,
  blogView,
  blogEdit,
  blogDelete
}
