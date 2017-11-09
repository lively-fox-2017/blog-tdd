const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp)
var data={
  title: 'zukek adalah sebuah secret',
  content: 'kata kunci bang jainal',
  author: 'bang jampang'
},
dataEdit={
  title: 'zukek adalah jainal',
  content: 'kata kunci bang jainal',
  author: 'bang jampang'
},
id;
describe('post articel route', function(){
  it('should return the article data, after they\'re saved to the database', function(done){
    chai.request(app)
    .post('/api/articles/')
    .send(data)
    .end(function(err, response){
      id=response.body.data._id
      // console.log(id);
      // console.log(response.body.data);
      response.status.should.equal(200)
      response.body.data.should.be.an('object')
      response.body.data.should.have.property('_id')
      response.body.data.should.have.property('title')
      response.body.data.should.have.property('content')
      response.body.data.should.have.property('author')
      response.body.data.title.should.equal('zukek adalah sebuah secret')
      response.body.data.content.should.equal('kata kunci bang jainal')
      response.body.data.author.should.equal('bang jampang')
      done();
    })
  })
})

describe('find articel route', function(){
  it('should return the article data, after they\'re find to the database', function(done){
    chai.request(app)
    .get('/api/articles/')
    .send(data)
    .end(function(err, response){
      response.status.should.equal(200)
      response.body.data.should.be.an('array')
      response.body.data[0].should.have.property('_id')
      response.body.data[0].should.have.property('title')
      response.body.data[0].should.have.property('content')
      response.body.data[0].should.have.property('author')
      response.body.data[0]._id.should.equal(`${id}`)
      response.body.data[0].title.should.equal(`${data.title}`)
      response.body.data[0].content.should.equal(`${data.content}`)
      response.body.data[0].author.should.equal(`${data.author}`)
      done();
    })
  })
})

describe('findById articel route', function(){
  it('should return the article data, after they\'re findById to the database', function(done){
    chai.request(app)
    .get(`/api/articles/${id}`)
    .send(data)
    .end(function(err, response){
      // console.log(response.body.data);
      response.status.should.equal(200)
      response.body.data.should.be.an('object')
      response.body.data.should.have.property('_id')
      response.body.data.should.have.property('title')
      response.body.data.should.have.property('content')
      response.body.data.should.have.property('author')
      response.body.data._id.should.equal(`${id}`)
      response.body.data.title.should.equal(`${data.title}`)
      response.body.data.content.should.equal(`${data.content}`)
      response.body.data.author.should.equal(`${data.author}`)
      done();
    })
  })
})

describe('edit articel route', function(){
  it('should return the article data, after they\'re edit to the database', function(done){
    chai.request(app)
    .put(`/api/articles/${id}`)
    .send(dataEdit)
    .end(function(err, response){
      // console.log(response.body.data);
      response.status.should.equal(200)
      response.body.data.should.be.an('object')
      response.body.data.should.have.property('_id')
      response.body.data.should.have.property('title')
      response.body.data.should.have.property('content')
      response.body.data.should.have.property('author')
      response.body.data._id.should.equal(`${id}`)
      response.body.data.title.should.equal(`${data.title}`)
      response.body.data.content.should.equal(`${data.content}`)
      response.body.data.author.should.equal(`${data.author}`)
      done();
    })
  })
})

describe('delete articel route', function(){
  it('should return the article data, after they\'re delete to the database', function(done){
    chai.request(app)
    .put(`/api/articles/${id}`)
    .send()
    .end(function(err, response){
      response.status.should.equal(200)
      response.body.data.should.be.an('object')
      response.body.data.should.have.property('_id')
      response.body.data.should.have.property('title')
      response.body.data.should.have.property('content')
      response.body.data.should.have.property('author')
      response.body.data._id.should.equal(`${id}`)
      response.body.data.title.should.equal(`${dataEdit.title}`)
      response.body.data.content.should.equal(`${dataEdit.content}`)
      response.body.data.author.should.equal(`${dataEdit.author}`)
      done();
    })
  })
})
