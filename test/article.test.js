const mocha = require('mocha')
var chai = require('chai')
, expect = chai.expect
, should = chai.should();
const chaiHttp = require('chai-http')
const app = require("../app")
chai.use(chaiHttp)

describe('put article data by id', function () {
    it('should return the article data from table by id after put to the database', function (done) {
        chai.request(app)
        .put('/article/59f6f2cbaaa90f7465d6527b')
        .send({ 
            title: 'Mengais rejeki di ibukota', 
            content: 'Content mengais rejeki',
            author: 'Mr. Didi Kempot',
            createdAt: '2017/10/12',
            image: 'image ibukota'
        })
        .then(function (response) {
            response.status.should.be.equal(200)
            response.body.should.be.an('object')
            response.body.should.have.property('_id')
            response.body.should.have.property('title')
            response.body.should.have.property('content')
            response.body.should.have.property('createdAt')
            response.body.should.have.property('image')
            done()
        })
        .catch(function (err) {
           throw err;
        })
    })
})

describe('get article data', function () {
    it('should return the one article data from table by id', function (done) {
        chai.request(app)
        .get('/article/59f6f2cbaaa90f7465d6527b')
        .end(function (err, response) {
            // console.log(response)
            response.status.should.be.equal(200)
            response.body.should.be.an('object')
            done()
        })
    })
})
describe('get all article data', function () {
    it('should return the all article data from table', function (done) {
        chai.request(app)
        .get('/article')
        .end(function (err, response) {
            // console.log(response)
            response.status.should.be.equal(200)
            response.body.should.be.an('array')
            done()
        })
    })
})
describe('post article data', function () {
    it('should return the article data after saved to the database', function (done) {
        chai.request(app)
        .post('/article')
        .type('form')
        .send({ 
            author: "Dimas",
            title: "Mencintai dengan hati", 
            content: "Isi content rayuan",
            author: "Mr. Dimas Anjasmara",
            createdAt: "2017/12/10",
            image: "link image"
        })
        .end(function (err, response) {
            response.status.should.be.equal(200)
            response.body.should.be.an('object')
            response.body.should.have.property('_id')
            response.body.should.have.property('title')
            response.body.should.have.property('content')
            response.body.should.have.property('createdAt')
            response.body.should.have.property('image')
            done()
        })
    })
})