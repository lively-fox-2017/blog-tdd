'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const app = require('./../app');
const models = require('./../models');

chai.use(chaiHttp);

describe('Read One Post: API: GET /post/:id', () => {
  /*
  Declare variable postId and author for testing
  */
  let validPostId = null;
  let invalidPostId = require('mongoose').Types.ObjectId();
  let validTitle = null;
  let validText = null;
  let validAuthor = null;
  let validImageUrl = null;

  /*
  fake user
  */
  const fakeUser = {
    username: 'user',
    password: 'user'
  }

  /*
  fake post
  */
  const fakePost = {
    title: 'This Is A Post',
    text: 'This is post content',
    featured_image_url: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
  }

  /*
  Before all tests, signup/create user to get jwtoken and create post for testing
  */
  before(done => {
    chai.request(app)
    .post('/signup')
    .send(fakeUser)
    .end((err, response) => {
      let jwtoken = response.body.payload.jwtoken;
      chai.request(app)
      .post('/post')
      .set('jwtoken', jwtoken)
      .send(fakePost)
      .end((err, response) => {
        validPostId = response.body.payload._id;
        validTitle = response.body.payload.title;
        validText = response.body.payload.text;
        validImageUrl = response.body.payload.featured_image_url;
        validAuthor = fakeUser.username;

        done();
      });
    });
  });

  /*
  After all tests, clear user and post database
  */
  after(done => {
    models.User.remove({}, (err) => {
      models.Post.remove({}, (err) => {
        done();
      });
    });
  });

  /*
  Test GET /post/:id response object
  */
  it('should generate a generic application response {status, message, payload, err}', (done) => {
    chai.request(app)
    .get('/post/' + validPostId)
    .end((err, response) => {
      const appResponse = response.body;

      should.exist(appResponse);

      appResponse.should.be.an('object');
      appResponse.should.have.property('status');
      appResponse.should.have.property('message');
      appResponse.should.have.property('payload');
      appResponse.should.have.property('err');

      appResponse.status.should.be.a('number');
      appResponse.message.should.be.a('string');
      appResponse.payload.should.be.an('object');
      should.not.exist(appResponse.err);

      done();
    });
  });

  /*
  Test GET /post response payload
  */
  it('should contains a post with _id, title, text, author, and featured_image_url properties', (done) => {
    chai.request(app)
    .get('/post/' + validPostId)
    .end((err, response) => {
      const appResponse = response.body;

      response.status.should.equal(200);

      appResponse.status.should.equal(200);
      appResponse.message.should.be.a('string');
      appResponse.payload.should.be.an('object');
      should.not.exist(appResponse.err);

      appResponse.payload.should.have.property('_id');
      appResponse.payload.should.have.property('title');
      appResponse.payload.should.have.property('text');
      appResponse.payload.should.have.property('author');
      appResponse.payload.should.have.property('featured_image_url');

      appResponse.payload._id.should.equal(validPostId);
      appResponse.payload.title.should.equal(validTitle);
      appResponse.payload.text.should.equal(validText);
      appResponse.payload.author.username.should.equal(validAuthor);
      appResponse.payload.featured_image_url.should.equal(validImageUrl);

      done();
    });
  });

  /*
  Test GET /post response payload with invalid post id
  */
  it('should return a 406 error if post id is invalid', (done) => {
    chai.request(app)
    .get('/post/' + invalidPostId)
    .end((err, response) => {
      const appResponse = response.body;

      response.status.should.equal(404);

      appResponse.status.should.equal(404);
      appResponse.message.should.be.a('string');
      should.not.exist(appResponse.payload);
      should.exist(appResponse.err);

      done();
    });
  });
});