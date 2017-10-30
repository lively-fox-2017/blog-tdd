const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

let should = chai.should();

chai.use(chaiHttp)

describe('GET authenticate', function() {
  this.timeout(8000);
  describe('User have been login before', () => {
    before(function(done) {
      User.remove({})
        .then(removed => {
          User.create([{
              userID: '123321123312',
              name: 'Foo',
              email: 'foo@bar.com',
              lastLogin: new Date()
            }, {
              userID: '123321121231',
              name: 'Bar',
              email: 'bar@foo.com',
              lastLogin: new Date()
            }])
            .then((inserted) => {
              done();
            })
        })
    });

    after((done) => {
      User.remove({})
        .then(removed => {
          done()
        })
    });

    it('It should return access token and lastLogin is not null', (done) => {
      chai.request(app)
        .post('/api/auth/get_authenticate')
        .send({
          userID: '123321123312',
          name: 'Foo',
          email: 'foo@bar.com',
        })
        .end(function(err, response) {
          if (err) {
            done(err)
          }
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('lastLogin');
          response.body.should.have.property('token');
          response.body.lastLogin.should.be.a('string');
          done()
        })
    });
  });

  describe('User never login before', () => {
    before((done) => {
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
    it('It should return token', (done) => {
      chai.request(app)
        .post('/api/auth/get_authenticate')
        .send({
          userID: '123321123312',
          name: 'Foo',
          email: 'foo@bar.com',
        })
        .end(function(err, response) {
          if (err) {
            done(err)
          }
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('lastLogin');
          response.body.should.have.property('token');
          should.equal(response.body.lastLogin, null);
          done()
        })
    });
  });
});
