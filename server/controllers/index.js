const blog = require('../models/index')

class Blog {

  static getData(req, res){
    blog.getBlog(req.headers, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static saveData(req, res){
    blog.saveBlog(req.headers, req.body, req.file, (result) => {
      res.send(result)
    })
  }

}

module.exports = Blog
