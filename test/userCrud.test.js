const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

let should = chai.should();

chai.use(chaiHttp)

describe('Init Connection', function() {
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

  describe('POST user route', function() {

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
});
