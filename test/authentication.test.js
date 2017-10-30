const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const User = require('../models/User');

chai.use(chaiHttp);

const newUser = {
  name: 'Dimitri Wahyudiputra',
  email: 'deathmitri@gmail.com',
  password: 'secret'
}

describe('Authentication', function () {

  before (() => {
    User.deleteMany({}).then(() => {
      console.log('Cleared `users` collection');
    });
  });

  describe('POST /auth/register', function () {

    it('should return registered user', function (requestFinished) {
      chai
        .request(server)
        .post('/auth/register')
        .send(newUser)
        .end(function (err, response) {
          response.status.should.equal(201);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('name');
          response.body.should.have.property('email');
          response.body.should.have.property('password');
          response.body.name.should.equal(newUser.name);
          response.body.email.should.equal(newUser.email);
          requestFinished();
        });
    });

    it('should return error 400 if passed object email already exist', function (requestFinished) {
      chai
        .request(server)
        .post('/auth/register')
        .send(newUser)
        .end(function (err, response) {
          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished();
        });
    });

    it('should return error 400 if passed object is not valid', function (requestFinished) {
      chai
        .request(server)
        .post('/auth/register')
        .send({ name: 'Alexei Wahyudiputra' })
        .end(function (err, response) {
          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished();
        });
    });

  });

  describe('POST /auth/login', function () {

    it('should return JWT access token', function (requestFinished) {
      chai
        .request(server)
        .post('/auth/login')
        .send({ email: 'deathmitri@gmail.com', password: 'secret' })
        .end(function (err, response) {
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('access_token');
          requestFinished();
        });
    });

    it('should return error 403 if username password combo is wrong', function (requestFinished) {
      chai
        .request(server)
        .post('/auth/login')
        .send({ email: 'alexei@gmail.com', password: 'nigga' })
        .end(function (err, response) {
          response.status.should.equal(403);
          response.body.should.be.an('object');
          requestFinished();
        });
    });

  });

});
