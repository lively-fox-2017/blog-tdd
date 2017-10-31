'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const app = require('./../app');
const models = require('./../models');

chai.use(chaiHttp);

describe('Read All Posts API: GET /post', () => {
	/*
	Declare variable jwtoken for testing
	*/
	// let jwtoken = null;
	// let falseJwtoken = jwt.sign({ foo: 'bar' }, 'falsestoken');

	/*
	Before all tests, signup/create user to get jwtoken for testing
	*/
	// before(done => {
	// 	chai.request(app)
	// 	.post('/signup')
	// 	.send({
	// 		username: 'user',
	// 		password: 'user'
	// 	})
	// 	.end((err, response) => {
	// 		jwtoken = response.body.payload.jwtoken;
	// 		done();
	// 	});
	// });

	/*
	After all tests, clear user database
	*/
	// after(done => {
	// 	models.User.remove({}, (err) => {
	// 		done();
	// 	});
	// });

	/*
	Test GET /posts response object
	*/
	it('should generate a generic application response {status, message, payload, err}', (done) => {
		chai.request(app)
		.get('/post')
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
			appResponse.payload.should.be.an('array');
			should.not.exist(appResponse.err);

			done();
		});
	});

	/*
	Test GET /posts response payload with 0 post
	*/
	it('should contain array of posts', (done) => {
		chai.request(app)
		.get('/post')
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.equal(200);

			appResponse.status.should.equal(200);
			appResponse.message.should.be.a('string');
			appResponse.payload.should.be.an('array').that.is.empty;
			should.not.exist(appResponse.err);

			done();
		});
	});

	/*
	Test GET /posts without jwtoken--should return error 401
	*/
	// it('should return a 401 error without any payload if jwtoken is missing', (done) => {
	// 	chai.request(app)
	// 	.get('/posts')
	// 	.end((err, response) => {
	// 		const appResponse = response.body;

	// 		response.status.should.equal(401);

	// 		appResponse.status.should.equal(401);
	// 		appResponse.message.should.be.a('string');
	// 		should.not.exist(appResponse.payload);
	// 		should.exist(appResponse.err);

	// 		done();
	// 	});
	// });

	/*
	Test GET /posts with false jwtoken--should return error 403
	*/
	// it('should return a 403 error without any payload if token is invalid', (done) => {
	// 	chai.request(app)
	// 	.set('jwtoken', falseJwtoken)
	// 	.get('/posts')
	// 	.end((err, response) => {
	// 		const appResponse = response.body;

	// 		response.status.should.equal(401);

	// 		appResponse.status.should.equal(401);
	// 		appResponse.message.should.be.a('string');
	// 		should.not.exist(appResponse.payload);
	// 		should.exist(appResponse.err);

	// 		done();
	// 	});
	// });
});