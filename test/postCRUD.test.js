const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const Models = require('../models/all-models');
const jwtprocessor = require('../helpers/jwtprocessor');
chai.use(chaiHttp)
let token = null;

describe('crud post', function(){
  before(function(done){
    Models.User.remove({email:'nnc@mail.com'})
    .then(user=>{
      chai.request(app)
      .post('/user/create')
      .send({
        email: 'nnc@mail.com',
        username: 'nnc',
        password: 'nncrawler'
      })
      .end(function(err, response){
        chai.request(app)
        .post('/user/login')
        .send({
          email:'nnc@mail.com',
          password:'nncrawler'
        })
        .end(function(err, response){
          token=response.body.token;
          done()
        })
      })
    })
  })

  after(function(done){
    Models.Post.remove({title:'penumpukan sampah pada tempatnya'})
    .then(post=>{
      done()
    })
  })

  it ('should fuckin post a post', function(done){
    chai.request(app)
    .post('/post')
    .send({
      token:token,
      title:'penumpukan sampah pada tempatnya',
      content:'penumpukan sampah disebabkan oleh kemerdekaan membuang sampah sembarangan'
    })
    .end(function(err, response){
      expect(err).to.be.equal(null);
      expect(response.body).have.property('message');
      expect(response.body.message).to.equal('berhasil');
      expect(response.body).have.property('post')
      expect(response.body.post.title).to.be.a('string')
      expect(response.body.post.content).to.be.a('string')
      done()
    })
  })

  it ('should edit post', function(done){
    chai.request(app)
    .post('/post')
    .send({
      token:token,
      title:'pembuangan sampah pada tempatnya',
      content:'pembakaran sampah disebabkan oleh kemerdekaan membuang sampah sembarangan'
    })
    .end(function(err, response){
      expect(err).to.be.equal(null);
      expect(response.body).have.property('message');
      expect(response.body.message).to.equal('berhasil');
      expect(response.body).have.property('post')
      expect(response.body.post.title).to.equal('pembuangan sampah pada tempatnya')
      expect(response.body.post.content).to.equal('pembakaran sampah disebabkan oleh kemerdekaan membuang sampah sembarangan')
      done()
    })
  })
})
