const chai = require('chai')
const should = chai.should()
const chaiHTTP = require('chai-http')

const app = require('../app')
const User = require('../models/user')

chai.use(chaiHTTP)

let dummyData = {
  username: "anton",
  password: "anton",
  secret: "hacktiv8",
  email: "anton@antonCorp.com"
}

describe('User Register Route', function() {
  it('Should return user data with success message, and saved to database', function(done) {
    chai.request(app)
    .post('/users/register')
    .send(dummyData)
    .end((err, res) => {
      // console.log('ada err ', err)
      // console.log('ada response ', res.body.data)
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('username')
      res.body.data.should.have.property('password')
      res.body.data.should.have.property('role')
      res.body.data.should.have.property('secret')
      res.body.data.should.have.property('email')
      res.body.data.username.should.equal('anton')
      res.body.data.password.should.equal('5c9d80c72fc50843003291c4da7d947b')
      res.body.data.role.should.equal('user')
      res.body.data.secret.should.equal('hacktiv8')
      res.body.data.email.should.equal('anton@antonCorp.com')
      done()
    })
  })
  it('Should return error when duplicate username or email', function(done) {
    chai.request(app)
    .post('/users/register')
    .send(dummyData)
    .end((err, res) => {
      res.status.should.equal(409)
      res.body.should.be.an('object')
      done()
    })
  })
})

describe('User Login Route', function() {
  after(function() {
    User.remove().then((result) => {
      console.log("Berhasil Hapus Semua");
    }).catch((reason) => {
      console.log(reason);
    })
  })
  
  it('Should return error when username doesnt match', function(done) {
    chai.request(app)
    .post('/users/login')
    .send({
      username: "antons",
      password: "anton"
    })
    .end((err, res) => {
      res.status.should.equal(401)
      res.body.should.be.an('object')
      res.body.message.should.equal('Sorry, wrong username')
      done()
    })
  })
  it('Should return error when password doesnt match', function(done) {
    chai.request(app)
    .post('/users/login')
    .send({
      username: "anton",
      password: "antons"
    })
    .end((err, res) => {
      res.status.should.equal(401)
      res.body.should.be.an('object')
      res.body.message.should.equal('Sorry, wrong password')
      done()
    })
  })
  it('Should return token when username and password match', function(done){
    chai.request(app)
    .post('/users/login')
    .send({
      username: "anton",
      password: "anton"
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.equal('Berhasil Login')
      res.body.token.should.be.a('string')
      done()
    })
  })
})
