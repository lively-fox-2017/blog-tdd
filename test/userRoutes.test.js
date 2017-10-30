const chai = require('chai')
const should = chai.should()
const chaiHTTP = require('chai-http')

const app = require('../app')

chai.use(chaiHTTP)

describe('User Register Routes', function() {
  it('Should return user data with success message, and saved to database', function(cb) {
    chai.request(app)
    .post('/users/register')
    .send({
      username: "anton",
      password: "anton",
      email: "anton@antonCorp.com"
    }).end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('_id')
      res.body.should.have.property('username')
      res.body.should.have.property('password')
      res.body.should.have.property('email')
      res.body.username.should.equal('anton')
      res.body.password.should.equal('anton')
      res.body.email.should.equal('anton@antonCorp.com')
      cb()
    })
  })
})
