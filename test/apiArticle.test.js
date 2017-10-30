var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var chaiJsonEqual = require('chai-json-equal')
var chaiFuzzy = require('chai-fuzzy')
var chaiLike = require('chai-like')
var app = require('../app')
var Blog = require('../models/blog')

chai.use(chaiHttp)
chai.use(chaiFuzzy)
chai.use(chaiJsonEqual)
chai.use(chaiLike)

describe('post new article route', function() {
  before( function(done){
    Blog.clear({}).then((removed)=>{
      done()
    })
  });
  after( function(){
    Blog.clear({}).then((removed)=>{

    })
  })
  it('should return the inserted data', function(done){
    chai.request(app).post('/api/article').send({
      title: 'Title Baru',
      content: 'Content Baru',
      author: 'Author Baru'
    }).end(function (err, response){
      response.status.should.equal(200)
      response.body.should.be.an('object')
      var insertedData = {
        title:'Title Baru',
        content:'Content Baru',
        author:'Author Baru',
      }
      response.body.should.like(insertedData);
      // response.body.should.have.property('_id')
      // response.body.should.have.property('title')
      // response.body.should.have.property('content')
      // response.body.should.have.property('author')
      // response.body.title.should.equal('Title Baru')
      // response.body.content.should.equal('Content Baru')
      // response.body.author.should.equal('Author Baru')
      done()
    })
  })
})
