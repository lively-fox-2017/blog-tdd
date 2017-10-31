const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const deleteAllArticle = require('../helpers/deleteAllArticle');

chai.use(chaiHttp);

const article = {
  title: 'Lorem Ipsum',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  slug: 'lorem-ipsum',
  featured_image: null,
  author: '59f0829e75c2503783f92f33'
};

describe('Article CRUD', function () {

  before (() => {
    deleteAllArticle();
  });

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
    it('should return error 400 if passed an invalid object', function (requestFinished) {
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

  describe('GET /articles', function () {
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

  describe('GET /articles/:slug', function () {
    it('should return an article', function (requestFinished) {
      chai
        .request(server)
        .get('/articles/' + article.slug)
        .end(function (err, response) {
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('title');
          response.body.should.have.property('content');
          response.body.should.have.property('excerpt');
          response.body.should.have.property('slug');
          response.body.should.have.property('featured_image');
          response.body.should.have.property('author');
          requestFinished();
        });
    });
    it('should return error 404 if slug doesn\'t exist', function (requestFinished) {
      chai
        .request(server)
        .get('/articles/randomslugthatwontreturnsomething')
        .end(function (err, response) {
          response.status.should.equal(404);
          response.body.should.be.an('object');
          requestFinished();
        });
    });
  });

  describe('PUT /articles/:slug', function () {
    it('should return updated article', function (requestFinished) {
      chai
        .request(server)
        .put('/articles/' + article.slug)
        .send(article)
        .end(function (err, response) {
          response.status.should.equal(200);
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

          requestFinished();
        });
    });
    it('should return error 404 if slug doesn\'t exist ', function (requestFinished) {
      chai
        .request(server)
        .put('/articles/randomslugthatwontreturnsomething')
        .send(article)
        .end(function (err, response) {
          response.status.should.equal(404);
          response.body.should.be.an('object');
          requestFinished();
        });
    });
    it('should return error 400 if passed an invalid object', function (requestFinished) {
      chai
        .request(server)
        .put('/articles/' + article.slug)
        .send({})
        .end(function (err, response) {
          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished();
        });
    });
  });

  describe('DELETE /articles/:slug', function () {
    it('should return deleted article', function (requestFinished) {
      chai
        .request(server)
        .delete('/articles/' + article.slug)
        .end(function (err, response) {
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('title');
          response.body.should.have.property('content');
          response.body.should.have.property('excerpt');
          response.body.should.have.property('slug');
          response.body.should.have.property('featured_image');
          response.body.should.have.property('author');
          requestFinished();
        });
    });
    it('should return error 404 if slug doesn\'t exist', function (requestFinished) {
      chai
        .request(server)
        .delete('/articles/59f0829e75c2503783f92f33')
        .end(function (err, response) {
          response.status.should.equal(404);
          response.body.should.be.an('object');
          requestFinished();
        });
    });
  });

});
