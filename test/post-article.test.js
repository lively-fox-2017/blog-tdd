const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const article = {
  title: 'Lorem Ipsum',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  slug: 'lorem-ipsum',
  featured_image: null,
  author: '59f0829e75c2503783f92f33'
};

describe('POST /articles', function () {
  it('should return inserted article', function (requestFinished) {
    chai
      .request(server)
      .post('/articles')
      .send(article)
      .end(function (err, response) {
        response.status.should.equal(201);
        response.body.should.be.an('object');
        response.body.should.have.property('_id');
        response.body.should.have.property('title');
        response.body.should.have.property('content');
        response.body.should.have.property('excerpt');
        response.body.should.have.property('slug');
        if (article.featured_image)
          response.body.should.have.property('featured_image');
        response.body.should.have.property('author');
        response.body.title.should.equal(article.title);
        response.body.content.should.equal(article.content);
        response.body.excerpt.should.equal(article.excerpt);
        response.body.slug.should.equal(article.slug);
        if (article.featured_image)
          response.body.featured_image.should.equal(article.featured_image);
        response.body.author.should.equal(article.author);

        article._id = response.body._id;

        requestFinished();
      });
  });
  it('should return error 400', function (requestFinished) {
    chai
      .request(server)
      .post('/articles')
      .send({})
      .end(function (err, response) {
        response.status.should.equal(400);
        response.body.should.be.an('object');
        requestFinished();
      })
  })
});

module.exports = article._id;
