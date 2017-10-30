var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var chaiJsonEqual = require('chai-json-equal')
var chaiFuzzy = require('chai-fuzzy')
var chaiLike = require('chai-like')
var app = require('../app')
var User = require('../models/user')
const encrypt = require('../helpers/cryptoHelper')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)
chai.use(chaiFuzzy)
chai.use(chaiLike)
chai.use(chaiJsonEqual)

describe('testing api auth', function() {
  var idDummy = null
  before(function(done) {
    User.clear().then((removed) => {
      done()
    })
  })
  after(function() {
    User.clear({}).then((removed) => {

    })
  })
  describe('register new user route', function() {
    it('should return the registered data', function(done) {
      chai.request(app).post('/api/auth/register').send({
        username: 'User Baru',
        name: 'Name',
        email: 'iniemail',
        password: 'pass'
      }).end(function(err, response) {
        response.status.should.equal(200)
        response.body.should.be.an('object')
        response.body.should.have.property('_id')
        response.body.should.have.property('username')
        response.body.should.have.property('name')
        response.body.should.have.property('email')
        response.body.should.have.property('password')
        response.body.username.should.equal('User Baru')
        response.body.name.should.equal('Name')
        response.body.email.should.equal('iniemail')
        var hash = encrypt('pass')
        response.body.password.should.equal(hash)
        idDummy = response.body._id
        done()
      })
    })
  })
  describe('login user route', function() {
    it('should response token with id and username', function(done) {
      chai.request(app).post('/api/auth/login').send({
        username: 'User Baru',
        password: 'pass'
      }).end(function(err, response) {
        response.status.should.equal(200)
        response.body.should.be.an('object')
        var decoded = jwt.verify(response.body.token, process.env.JWT_KEY)
        decoded.username.should.equal('User Baru')
        decoded._id.should.equal(idDummy)
        done()
      })
    })
  })
})
