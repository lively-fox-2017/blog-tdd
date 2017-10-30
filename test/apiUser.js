// var chai = require('chai')
// var should = chai.should()
// var chaiHttp = require('chai-http')
// var chaiJsonEqual = require('chai-json-equal')
// var chaiFuzzy = require('chai-fuzzy')
// var chaiLike = require('chai-like')
// var app = require('../app')
// var User = require('../models/user')
// const encrypt = require('../helpers/cryptoHelper')
//
// chai.use(chaiHttp)
// chai.use(chaiFuzzy)
// chai.use(chaiLike)
// chai.use(chaiJsonEqual)
//
// describe('testing api user', function() {
//   before(function(done) {
//     User.clear().then((removed) => {
//       done()
//     })
//   })
//   after(function() {
//     User.clear({}).then((removed) => {
//       process.exit(0)
//     })
//   })
//   describe('post new user route', function() {
//     var idDummy = null
//     it('should return the inserted data', function(done) {
//       chai.request(app).post('/api/user').send({
//         username: 'User Baru',
//         name: 'Name',
//         email: 'iniemail',
//         password: 'pass'
//       }).end(function(err, response) {
//         response.status.should.equal(200)
//         response.body.should.be.an('object')
//         response.body.should.have.property('_id')
//         response.body.should.have.property('username')
//         response.body.should.have.property('name')
//         response.body.should.have.property('email')
//         response.body.should.have.property('password')
//         response.body.username.should.equal('User Baru')
//         response.body.name.should.equal('Name')
//         response.body.email.should.equal('iniemail')
//         var hash = encrypt('pass')
//         response.body.password.should.equal(hash)
//         idDummy = response.body._id
//         done()
//       })
//     })
//     it('should return the inserted data', function(done) {
//       chai.request(app).post('/api/user').send({
//         username: 'User Baru Lagi',
//         name: 'Name Lagi',
//         email: 'iniemail Lagi',
//         password: 'passlagi'
//       }).end(function(err, response) {
//         response.status.should.equal(200)
//         response.body.should.be.an('object')
//         var hash = encrypt('passlagi')
//         var insertedData = {
//           username: 'User Baru Lagi',
//           name: 'Name Lagi',
//           email: 'iniemail Lagi',
//           password: hash,
//         }
//         response.body.should.like(insertedData);
//         // response.body.should.have.property('_id')
//         // response.body.should.have.property('username')
//         // response.body.should.have.property('name')
//         // response.body.should.have.property('email')
//         // response.body.should.have.property('password')
//         // response.body.username.should.equal('User Baru')
//         // response.body.name.should.equal('Name')
//         // response.body.email.should.equal('iniemail')
//         //
//         // response.body.password.should.equal(hash)
//         done()
//       })
//     })
//     it('should return error not enough param', function(done) {
//       chai.request(app).post('/api/user').send({
//         username: 'User Baru',
//         email: 'iniemail',
//         password: 'pass'
//       }).end(function(err, response) {
//         response.status.should.equal(500)
//         response.body.should.be.an('object')
//         response.body.message.should.equal('User validation failed: name: Path `name` is required.')
//         done()
//       })
//     })
//     it('should return error duplicate data', function(done) {
//       chai.request(app).post('/api/user').send({
//         username: 'User Baru',
//         name: 'Name',
//         email: 'iniemail',
//         password: 'pass'
//       }).end(function(err, response) {
//         response.status.should.equal(500)
//         response.body.should.be.an('object')
//         response.text = JSON.parse(response.text);
//         response.text.code.should.equal(11000)
//         response.text.index.should.equal(0)
//         response.text.errmsg.should.equal('E11000 duplicate key error collection: blogtdd_test.users index: username_1 dup key: { : \"User Baru\" }')
//         done()
//       })
//     })
//     it('should return all data', function(done) {
//       chai.request(app).get('/api/user').end(function(err, response) {
//         response.status.should.equal(200)
//         response.body.should.be.an('array')
//         response.body.should.have.lengthOf(2)
//         var hash2 = encrypt('passlagi')
//         var insertedData2 = {
//           username: 'User Baru Lagi',
//           name: 'Name Lagi',
//           email: 'iniemail Lagi',
//           password: hash2,
//         }
//         var hash1 = encrypt('pass')
//         var insertedData1 = {
//           username: 'User Baru',
//           name: 'Name',
//           email: 'iniemail',
//           password: hash1
//         }
//         response.body[0].should.like(insertedData1);
//         response.body[1].should.like(insertedData2);
//
//         done()
//       })
//     })
//     it('should return one data', function(done) {
//       chai.request(app).get('/api/user/' + idDummy).end(function(err, response) {
//         response.status.should.equal(200)
//         response.body.should.be.an('object')
//         var hash1 = encrypt('pass')
//         var insertedData1 = {
//           username: 'User Baru',
//           name: 'Name',
//           email: 'iniemail',
//           password: hash1
//         }
//         response.body.should.like(insertedData1);
//         done()
//       })
//     })
//     it('should return updated data', function(done) {
//       chai.request(app).put('/api/user/' + idDummy).send({
//         name:'Nama',
//         email:'Email'
//       }).end(function(err, response) {
//         response.status.should.equal(200)
//         response.body.should.be.an('object')
//         var hash1 = encrypt('pass')
//         var insertedData1 = {
//           username: 'User Baru',
//           name: 'Nama',
//           email: 'Email',
//           password: hash1
//         }
//         response.body.should.like(insertedData1);
//         done()
//       })
//     })
//     it('should return deleted data', function(done) {
//       chai.request(app).delete('/api/user/' + idDummy).end(function(err, response) {
//         response.status.should.equal(200)
//         response.body.should.be.an('object')
//         var hash1 = encrypt('pass')
//         var insertedData1 = {
//           username: 'User Baru',
//           name: 'Nama',
//           email: 'Email',
//           password: hash1
//         }
//         response.body.should.like(insertedData1);
//         done()
//       })
//     })
//   })
// })
