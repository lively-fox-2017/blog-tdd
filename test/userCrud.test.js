const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

let should = chai.should();

chai.use(chaiHttp)

describe('Init Connection', function() {

  describe('POST user route', function() {
    // Hook to clear User
    before(function(done) {
      User.remove({})
        .then(removed => {
          done()
        })
    });

    after((done) => {
      User.remove({})
        .then(removed => {
          done()
        })
    });

    it('It should return the inserted user after they are stored to database', function(done) {
      chai.request(app)
        .post('/api/user/add_user')
        .send({
          userID: '123321123312',
          name: 'Foo',
          email: 'foo@bar.com',
        })
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('userID');
          response.body.should.have.property('name');
          response.body.should.have.property('email');
          response.body.should.have.property('lastLogin');
          response.body.should.have.property('createdAt');
          response.body.userID.should.equal('123321123312');
          response.body.name.should.equal('Foo');
          response.body.email.should.equal('foo@bar.com');
          done();
        });
    });

    it('It should return status 400 because no request body sent', function(done) {
      chai.request(app)
        .post('/api/user/add_user')
        .send({})
        .end(function(err, response) {
          response.status.should.equal(400);
          done();
        });
    });
  });

  describe('GET users route', () => {
    beforeEach(function(done) {
      User.create([{
          userID: '123321123312',
          name: 'Foo',
          email: 'foo@bar.com',
        }, {
          userID: '123321121231',
          name: 'Bar',
          email: 'bar@foo.com',
        }])
        .then((inserted) => {
          done();
        })
    });

    afterEach((done) => {
      User.remove({})
        .then(removed => {
          done()
        })
    });

    it('It should return all users', (done) => {
      let obj = [{
        userID: '123321123312',
        name: 'Foo',
        email: 'foo@bar.com',
      }, {
        userID: '123321121231',
        name: 'Bar',
        email: 'bar@foo.com',
      }];

      chai.request(app)
        .get('/api/user/get_user')
        .send()
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.lengthOf(2);
          response.body.forEach((element, index) => {
            element.should.have.property('_id');
            element.should.have.property('userID');
            element.should.have.property('name');
            element.should.have.property('email');
            element.should.have.property('lastLogin');
            element.should.have.property('createdAt');
            element.userID.should.equal(obj[index].userID);
            element.name.should.equal(obj[index].name);
            element.email.should.equal(obj[index].email);
          })
          done();
        })
    });

    it('It should return specific user which parameter specified', (done) => {
      chai.request(app)
        .get('/api/user/get_user/' + 123321123312)
        .send()
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.lengthOf(1);
          response.body[0].should.have.property('_id');
          response.body[0].should.have.property('userID');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('email');
          response.body[0].should.have.property('lastLogin');
          response.body[0].should.have.property('createdAt');
          response.body[0].userID.should.equal('123321123312');
          response.body[0].name.should.equal('Foo');
          response.body[0].email.should.equal('foo@bar.com');
          done();
        })
    });
    it('It should return specific user which parameter specified', (done) => {
      chai.request(app)
        .get('/api/user/get_user/' + 123321123312)
        .send()
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.lengthOf(1);
          response.body[0].should.have.property('_id');
          response.body[0].should.have.property('userID');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('email');
          response.body[0].should.have.property('lastLogin');
          response.body[0].should.have.property('createdAt');
          response.body[0].userID.should.equal('123321123312');
          response.body[0].name.should.equal('Foo');
          response.body[0].email.should.equal('foo@bar.com');
          done();
        })
    });
  });

  describe('UPDATE users route', () => {
    beforeEach(function(done) {
      User.create([{
          userID: '123321123312',
          name: 'Foo',
          email: 'foo@bar.com',
        }, {
          userID: '123321121231',
          name: 'Bar',
          email: 'bar@foo.com',
        }])
        .then((inserted) => {
          done();
        })
    });

    afterEach((done) => {
      User.remove({})
        .then(removed => {
          done()
        })
    });

    it('It should return updated ', (done) => {
      chai.request(app)
        .put('/api/user/update_user/' + 123321123312)
        .send({
          lastLogin: new Date()
        })
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('userID');
          response.body.should.have.property('name');
          response.body.should.have.property('email');
          response.body.should.have.property('lastLogin');
          response.body.should.have.property('createdAt');
          response.body.userID.should.equal('123321123312');
          response.body.name.should.equal('Foo');
          response.body.email.should.equal('foo@bar.com');
          done();
        })
    });

    it('It should return error because date is not valid', (done) => {
      chai.request(app)
        .put('/api/user/update_user/' + 123321123312)
        .send({
          lastLogin: 'asdasd'
        })
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(400);
          done();
        })
    });

    it('It should return error because no params', (done) => {
      chai.request(app)
        .put('/api/user/update_user/')
        .send({
          lastLogin: 'asdasd'
        })
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(400);
          done();
        })
    });
  });
});
