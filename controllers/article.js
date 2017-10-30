const model = require("../models/article")
const ObjectId = require('mongodb').ObjectId

class Article {
    static add_data(req,res) {
        model.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            createdAt: req.body.createdAt,
            image: req.body.image
        })
        .then(response => {
            let result = {
                "_id":response._id,
                "title":req.body.title,
                "content":req.body.content,
                "author":req.body.author,
                "createdAt":req.body.createdAt,
                "image":req.body.image
            }
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static edit_data(req,res) {
        model.updateOne({
            _id:ObjectId(req.params.id)
        },
        {
            $set: {
                'title':req.body.title,
                'content':req.body.content,
                'author':req.body.author,
                'createdAt':req.body.createdAt,
                'image':req.body.image
            }
        })
        .then(response => {
            let result = {
                '_id':req.params.id,
                'title':req.body.title,
                'content':req.body.content,
                'author':req.body.author,
                'createdAt':req.body.createdAt,
                'image':req.body.image
            }
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static get_all(req,res) {
        model.find()
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static get_one(req,res) {
        model.findOne({_id:req.params.id})
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = Article