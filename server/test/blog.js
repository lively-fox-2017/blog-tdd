const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../app.js')

chai.use(chaiHttp)

const data = {
  author: 'dimas',
  title: 'belajar coding',
  content:'belajar tdd at hacktiv8'
}

describe('should be pass testing',function(){
  describe('should be ok',function(){
    it('should save without eror', function(done){
      chai.request(app)
      .post('/post')
      .send(data)
      .end((err,response)=>{
        response.body.should.be.an('object')
        response.status.should.be.equal(200)
        response.body.should.have.property('author')
        response.body.should.have.property('title')
        response.body.should.have.property('content')
        done()
      })
    })
  })
})

describe('should get data',function(){
  describe('should be ok',function(){
    it('should show without eror', function(done){
      chai.request(app)
      .get('/')
      .end((err,response)=>{
        response.status.should.be.equal(200)
        response.body.should.be.an('Array')
        done()
      })
    })
  })
})

describe('should edit data',function(){
  describe('should be ok',function(){
    it('should edited without eror', function(done){
      chai.request(app)
      .post('/')
      .send(data)
      .end((err,response)=>{
        chai.request(app)
        .put(`/${response.body._id}`)
        .send({author:'edit'})
        .end(function(err,res){
          response.status.should.be.equal(200)
          response.body.should.have.property('edit')
        })
        done()
      })
    })
  })
})

describe('should delete data',function(){
  describe('should be deleted',function(){
    it('should deleted without eror', function(done){
      chai.request(app)
      .post('/')
      .send(data)
      .end((err,response)=>{
        chai.request(app)
        .delete(`/${response.body._id}`)
        .end(function(err,res){
          console.log(response.body.author);
          response.status.should.be.equal(200)
        })
        done()
      })
    })
  })
})
