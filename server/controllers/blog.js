var Blog = require('../models/blog')

let get =function(req,res){
  Blog.find({},function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}
let post = function(req,res){
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image
  },function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let update = function(req,res){
  Blog.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    content: req.body.content,
    image: req.body.image
  },function(err,result){
    if(!err){
      res.json({message:'data sudah di ubah'})
    }else{
      res.send(err)
    }
  })
}

let deletenews =function(req,res){
  Blog.findByIdAndRemove(req.params.id,function(err){
    if(!err){
      res.json({message:'data sudah Dihapus'})
    }else{
      res.send(err)
    }
  })
}

module.exports = { get,post,update,deletenews}