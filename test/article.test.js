const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Article = require('../models/article');
const User = require('../models/user');

let should = chai.should();

chai.use(chaiHttp)

describe('API Article', () => {
  before(function(done) {
    Article.remove({})
      .then(removed => {
        User.create({
            userID: '1573550952666971',
            name: 'Foo',
            email: 'foo@bar.com',
          })
          .then((inserted) => {
            Article.create([{
                slug: 'slug-1',
                title: 'Foo',
                content: 'THIS IS CONTENT',
                author: inserted._id,
              }, {
                slug: 'slug-2',
                title: 'Bar',
                content: 'THIS IS CONTENT',
                author: inserted._id,
              }])
              .then((inserted) => {
                done();
              })
              .catch((err) => {
                console.log('sini', err);
              })
          })
      })
  });

  after((done) => {
    Article.remove({})
      .then(removed => {
        done()
      })
  });

  describe('GET API', () => {

    it('It should return all arricles', (done) => {
      User.find()
        .then((users) => {
          chai.request(app)
            .get('/api/article/get_article')
            .send()
            .end(function(err, response) {
              if (err)
                console.log(err.text);
              response.status.should.equal(200);
              response.body.should.be.an('array');
              response.body.should.have.lengthOf(2);
              response.body.forEach((element, index) => {
                element.should.have.property('_id');
                element.should.have.property('title');
                element.should.have.property('slug');
                element.should.have.property('content');
                element.should.have.property('author');
                element.should.have.property('createdAt');
                element.author.should.an('object');
                element.author.should.have.property('userID');
                element.author.should.have.property('name');
                element.author.should.have.property('email');
              })
              done();
            })
        })
        .catch((err) => {
          console.error(err);
          done()
        })
    });

    it('It should return specific article which parameter specified', (done) => {
      User.find()
        .then((users) => {
          chai.request(app)
            .get('/api/article/get_article/foo')
            .send()
            .end(function(err, response) {
              if (err)
                console.log(err.text);
              response.status.should.equal(200);
              response.body.should.be.an('array');
              response.body.should.have.lengthOf(1);
              response.body[0].should.have.property('_id');
              response.body[0].should.have.property('title');
              response.body[0].should.have.property('slug');
              response.body[0].should.have.property('content');
              response.body[0].should.have.property('author');
              response.body[0].should.have.property('createdAt');
              response.body[0].author.should.be.an('object');
              response.body[0].author.should.have.property('userID');
              response.body[0].author.should.have.property('name');
              response.body[0].author.should.have.property('email');
              done();
            })
        })
        .catch((err) => {
          console.error(err);
          done()
        })
    });

    it('It should return all articles based on author', (done) => {
      User.find()
        .then((users) => {
          chai.request(app)
            .get(`/api/article/get_user_article/${users[0].userID}`)
            .send()
            .end(function(err, response) {
              if (err)
                console.log(err.text);
              response.status.should.equal(200);
              response.body.should.be.an('array');
              response.body.should.have.lengthOf(2);
              response.body.forEach((element, index) => {
                element.should.have.property('_id');
                element.should.have.property('title');
                element.should.have.property('slug');
                element.should.have.property('content');
                element.should.have.property('author');
                element.should.have.property('createdAt');
                element.author.should.an('object');
                element.author.should.have.property('userID');
                element.author.should.have.property('name');
                element.author.should.have.property('email');
              })
              done();
            })
        })
        .catch((err) => {
          console.error(err);
          done()
        })
    });

    it('It should return 204', (done) => {
      chai.request(app)
        .get(`/api/article/get_user_article/59f810eeb167d22346b82246`)
        .send()
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(204);
          done();
        })
    });
  });

  describe('POST API', () => {
    it('It should return inserted article', (done) => {
      chai.request(app)
        .post('/api/article/post_article')
        .send({
          title: 'Foo',
          content: 'THIS IS CONTENT',
          author: '1573550952666971',
        })
        .end(function(err, response) {
          if (err)
            console.log(err);
          response.status.should.equal(201);
          response.body.should.be.an('object');
          response.body.should.have.property('title');
          response.body.should.have.property('slug');
          response.body.should.have.property('content');
          response.body.should.have.property('author');
          response.body.should.have.property('createdAt');
          response.body.slug.should.be.an('string');
          response.body.title.should.equal('Foo');
          response.body.slug.should.equal('foo-2');
          response.body.content.should.equal('THIS IS CONTENT');
          done()
        })
    });

    it('It should return 400', (done) => {
      chai.request(app)
        .post('/api/article/post_article')
        .send({
          content: 'THIS IS CONTENT',
          author: '1573550952666971',
        })
        .end(function(err, response) {
          if (err)
            console.log(err);
          response.status.should.equal(400);
          done()
        })
    });
  });
});
