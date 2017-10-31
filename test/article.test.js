const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Article = require('../models/article');
const User = require('../models/user');

let should = chai.should();

chai.use(chaiHttp)

describe('API Article', () => {
  describe('GET API', () => {
    before(function(done) {
      Article.remove({})
        .then(removed => {
          User.create({
              userID: '123321123312',
              name: 'Foo',
              email: 'foo@bar.com',
            })
            .then((inserted) => {
              Article.create([{
                  articleID: 'AAIII',
                  title: 'Foo',
                  content: 'THIS IS CONTENT',
                  author: inserted._id,
                }, {
                  articleID: 'AAUUU',
                  title: 'Bar',
                  content: 'THIS IS CONTENT',
                  author: inserted._id,
                }])
                .then((inserted) => {
                  done();
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
    let obj = [{
      articleID: 'AAIII',
      title: 'Foo',
      content: 'THIS IS CONTENT',
      author: '123321123312',
    }, {
      articleID: 'AAUUU',
      title: 'Bar',
      content: 'THIS IS CONTENT',
      author: '123321121231',
    }];

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
                element.should.have.property('articleID');
                element.should.have.property('title');
                element.should.have.property('content');
                element.should.have.property('author');
                element.should.have.property('createdAt');
                element.articleID.should.equal(obj[index].articleID);
                element.title.should.equal(obj[index].title);
                element.content.should.equal(obj[index].content);
                element.author.should.an('object');
                element.author.should.have.property('userID');
                element.author.should.have.property('name');
                element.author.should.have.property('email');
                element.author.userID.should.equal(users[0].userID);
                element.author.name.should.equal(users[0].name);
                element.author.email.should.equal(users[0].email);
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
            .get('/api/article/get_article/AAIII')
            .send()
            .end(function(err, response) {
              if (err)
                console.log(err.text);
              response.status.should.equal(200);
              response.body.should.be.an('array');
              response.body.should.have.lengthOf(1);
              response.body[0].should.have.property('_id');
              response.body[0].should.have.property('articleID');
              response.body[0].should.have.property('title');
              response.body[0].should.have.property('content');
              response.body[0].should.have.property('author');
              response.body[0].should.have.property('createdAt');
              response.body[0].articleID.should.equal('AAIII');
              response.body[0].title.should.equal('Foo');
              response.body[0].content.should.equal('THIS IS CONTENT');
              response.body[0].author.should.be.an('object');
              response.body[0].author.should.have.property('userID');
              response.body[0].author.should.have.property('name');
              response.body[0].author.should.have.property('email');
              response.body[0].author.userID.should.equal(users[0].userID);
              response.body[0].author.name.should.equal(users[0].name);
              response.body[0].author.email.should.equal(users[0].email);
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
                element.should.have.property('articleID');
                element.should.have.property('title');
                element.should.have.property('content');
                element.should.have.property('author');
                element.should.have.property('createdAt');
                element.articleID.should.equal(obj[index].articleID);
                element.title.should.equal(obj[index].title);
                element.content.should.equal(obj[index].content);
                element.author.should.an('object');
                element.author.should.have.property('userID');
                element.author.should.have.property('name');
                element.author.should.have.property('email');
                element.author.userID.should.equal(users[0].userID);
                element.author.name.should.equal(users[0].name);
                element.author.email.should.equal(users[0].email);
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
  // beforeEach((done) => {
  //   Article.remove({})
  //     .then(removed => {
  //       done()
  //     })
  // });
  // afterEach((done) => {
  //   Article.remove({})
  //     .then(removed => {
  //       done()
  //     })
  // });
});
