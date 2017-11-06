process.env.NODE_ENV='test'

var chai = require('chai')
var chaiHttp = require ('chai-http')
var server = require('../app')
var should = chai.should()
const expect = require('chai').expect;
let Blog = require('../models/blog')

chai.use(chaiHttp)

describe('Blog',function(){
    it('/blog GET',function(done){
      chai.request(server)
      .get('/blog')
      .end(function(err,response){
        // response.body.should.be.an('object')
        response.status.should.equal(200);
        response.body.should.be.an('array')
        // expect(response.body).to.eql({})
        done()
      })
  });
})
  describe('Blog',function(){
    it('should add a SINGLE blog on /blog POST',function(done){
      chai.request(server)
      .post('/blog')
      .end((err, response)=>{
        response.body.should.be.an('object')
        response.status.should.equal(200)
        response.body.should.have.property('_id')
        response.body.should.have.property('__v')
        // response.body.should.have.property('id')
        done()
      })
    });
  })

  describe('Blog',function(){
    it('should update a SINGLE blog on /blog/<id> PUT',(done)=>{
      let blog = new Blog({_id:"59f734451636b316f4bb7911", id:"wajib",content:"Mandi",news:"http://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3d43c58e/images/hi-res/84030_PBH.jpg?sw=300&sh=300&sfrm=png"})
      blog.save((err,book)=>{
        chai.request(server)
        .put('/blog/'+ blog._id)
        .send({id:"hokya", content:"hokya2",news:"hokya3"})
        .end((err,res)=>{
          res.body.should.be.a('object');
          res.status.should.equal(200);
          res.body.should.have.property('message').eql('data sudah di ubah');
          done()
        })
      })
    });
  })

  describe('Blog',function(){
    it('should delete a SINGLE blog on /blog/<id> DELETE',(done)=>{
      let blog= new Blog({id:"wajib",content:"Mandi",news:"http://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3d43c58e/images/hi-res/84030_PBH.jpg?sw=300&sh=300&sfrm=png"})
        blog.save((err,blog)=>{
        chai.request(server)
        .delete('/blog/'+ blog.id)
        .end((err,res)=>{
          res.status.should.equal(200);
          done()

      })
      })
    })
  })