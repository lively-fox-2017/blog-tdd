const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('get /articles', function () {
  it('should return article list', function (requestFinished) {
    chai.request(server)
      .get('/articles')
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('array');
        requestFinished();
      });
  });
});
