const mocha = require('mocha');
const chai = require('chai');
const expect =  chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const Models = require('../models/all-models');

chai.use(chaiHttp)

describe('user api test', function(){
  before(function(done) {
    Models.User.remove({}, done)
  });
  it ('should create new user', function(done){

      chai.request(app)
      .post('/user/create')
      .send({
        email: 'rasyid.xyz@gmail.com',
        username: 'nncrawler',
        password: 'nncrawler'
      })
      .end(function (err, response){
        expect(err).to.be.null;
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('berhasil');
        done()
      })

  });
  it ('should return error when same email input', function(done){

      chai.request(app)
      .post('/user/create')
      .send({
        email: 'rasyid.xyz@gmail.com',
        username: 'nncrawler',
        password: 'nncrawler'
      })
      .end(function (err, response){
        expect(err).to.be.null;
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('gagal');
        done()
      })

  });
  it ('should check user credential and return berhasil if true', function(done){
      chai.request (app)
      .post('/user/login')
      .send({
        email: 'rasyid.xyz@gmail.com',
        password: 'nncrawler'
      })
      .end(function (err, response){
        expect(err).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('berhasil');
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.not.equal(null)
        done()
      })

  });
})
