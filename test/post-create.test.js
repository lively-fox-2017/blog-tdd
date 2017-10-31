'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const jwt = require('jsonwebtoken');

const app = require('./../app');
const models = require('./../models');

chai.use(chaiHttp);
/*
POST {
	_id:
	title:
	text:
	author:
	featured_image_url:
}
*/

describe('Create a Post API: POST /post', () => {
	/*
	Declare variable jwtoken for testing
	*/
	let jwtoken = null;
	let falseJwtoken = jwt.sign({ foo: 'bar' }, 'falsestoken');

	/*
	Valid request body
	*/
	const validPost = {
		title: 'This Is A Post',
		text: 'This is post content',
		featured_image_url: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
	}
	/*
	Valid request body without featured image
	*/
	const validPostWithoutImage = {
		title: 'This Is A Post',
		text: 'This is post content'
	}
	/*
	Invalid request body--missing title
	*/
	const invalidPostMissingTitle = {
		text: 'This is post content'
	}
	/*
	Invalid request body--missing text
	*/
	const invalidPostMissingText = {
		title: 'This Is A Post'
	}

	/*
	Before all tests, signup/create user to get jwtoken for testing
	*/
	before(done => {
		chai.request(app)
		.post('/signup')
		.send({
			username: 'user',
			password: 'user'
		})
		.end((err, response) => {
			jwtoken = response.body.payload.jwtoken;
			done();
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
	Test POST /post response object
	*/
	it('should generate a generic application response {status, message, payload, err}', (done) => {
		chai.request(app)
		.post('/post')
		.set('jwtoken', jwtoken)
		.send(validPost)
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
	Test POST /post response payload
	*/
	it('should contain a posted object with author equals to user\'s username and have _id, title, text, author, and featured_image_url properties if token is valid and request body is valid', (done) => {
		chai.request(app)
		.post('/post')
		.set('jwtoken', jwtoken)
		.send(validPost)
		.end((err, response) => {
			const appResponse = response.body;
			const jwtokenDecoded = jwt.verify(jwtoken, process.env.JWT_SECRET_KEY);

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

			appResponse.payload._id.should.be.a('string');
			appResponse.payload.title.should.be.a('string');
			appResponse.payload.text.should.be.a('string');
			appResponse.payload.author.should.be.a('string');
			appResponse.payload.featured_image_url.should.be.a('string');

			appResponse.payload.author.should.equal(jwtokenDecoded.username);

			done();
		});
	});

	/*
	Test POST /post response payload without featured image
	*/
	it('should contain a posted object with author equals to user\'s username and have _id, title, text, author, and featured_image_url properties if token is valid and request body is valid. featured_image_url should be empty', (done) => {
		chai.request(app)
		.post('/post')
		.set('jwtoken', jwtoken)
		.send(validPostWithoutImage)
		.end((err, response) => {
			const appResponse = response.body;
			const jwtokenDecoded = jwt.verify(jwtoken, process.env.JWT_SECRET_KEY);

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

			appResponse.payload._id.should.be.a('string');
			appResponse.payload.title.should.be.a('string');
			appResponse.payload.text.should.be.a('string');
			appResponse.payload.author.should.be.a('string');
			should.not.exist(appResponse.payload.featured_image_url);

			appResponse.payload.author.should.equal(jwtokenDecoded.username);

			done();
		});
	});

	/*
	Test POST /post response payload with title missing
	*/
	it('should return a 406 error without any payload if title is missing', (done) => {
		chai.request(app)
		.post('/post')
		.set('jwtoken', jwtoken)
		.send(invalidPostMissingTitle)
		.end((err, response) => {
			const appResponse = response.body;
			const jwtokenDecoded = jwt.verify(jwtoken, process.env.JWT_SECRET_KEY);

			response.status.should.equal(406);

			appResponse.status.should.equal(406);
			appResponse.message.should.be.a('string');
			should.not.exist(appResponse.payload)
			should.exist(appResponse.err);

			done();
		});
	});
	
	/*
	Test POST /post response payload with text missing
	*/
	it('should return a 406 error without any payload if text is missing', (done) => {
		chai.request(app)
		.post('/post')
		.set('jwtoken', jwtoken)
		.send(invalidPostMissingText)
		.end((err, response) => {
			const appResponse = response.body;
			const jwtokenDecoded = jwt.verify(jwtoken, process.env.JWT_SECRET_KEY);

			response.status.should.equal(406);

			appResponse.status.should.equal(406);
			appResponse.message.should.be.a('string');
			should.not.exist(appResponse.payload)
			should.exist(appResponse.err);

			done();
		});
	});

	/*
	Test POST /post response payload without jwtoken--should return error 401
	*/
	it('should return a 401 error withour any payload if jwtoken is missing', (done) => {
		chai.request(app)
		.post('/post')
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.equal(401);

			appResponse.status.should.equal(401);
			appResponse.message.should.be.a('string');
			should.not.exist(appResponse.payload);
			should.exist(appResponse.err);

			done();
		});
	});

	/*
	Test POST /post response payload with false jwtoken--should return error 403
	*/
	it('should return a 401 error withour any payload if jwtoken is missing', (done) => {
		chai.request(app)
		.post('/post')
		.set('jwtoken', falseJwtoken)
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.equal(403);

			appResponse.status.should.equal(403);
			appResponse.message.should.be.a('string');
			should.not.exist(appResponse.payload);
			should.exist(appResponse.err);

			done();
		});
	});
});