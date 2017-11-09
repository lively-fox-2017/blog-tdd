const chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config()
//jangan lupa require app.js-nya
var app = require('../app');

chai.use(chaiHttp);

let userNya = {
  username: 'Dummy-1',
  password: '123',
  email: 'dummy@email.com'
}

let id = ''

let loginNya = {
  username: 'Dummy-1',
  password: '123'
}

let edit = {
  username: 'Dummy-1',
  password: '123',
  email: 'dummy@email.com'
}

describe('API buat User baru',function(){
  it('Pendaftaran User',function(done){
    chai.request(app)
    .post('/user')
    .send(userNya)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    })
  }),
  it('Mendapatkan data Semua user',function(done){
    chai.request(app)
    .get('/user')
    .end(function(err,res){
      id = res.body[0]._id
      res.should.have.status(200);
      done();
    })
  }),
  it('Mendapatkan data satu user',function(done){
    chai.request(app)
    .get('/user/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      res.body.should.have.property('_id');
      done()
    })
  }),
  it('Test Login', (done) => {
    chai.request(app)
    .post('/user/login')
    .send(loginNya)
    .end(function(err, res) {
      res.body.should.have.property('token')
      done()
    })
  }),
  it('Edit data satu artikel',function(done){
    chai.request(app)
    .put('/user/'+id)
    .send(edit)
    .end(function(err,res){
      res.should.have.status(200);
      console.log(res.body);
      done()
    })
  }),
  it('Delete data satu user',function(done){
    chai.request(app)
    .delete('/user/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      done()
    })
  })
})
