'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const jwt = require('jsonwebtoken');

const app = require('./../app');
const models = require('./../models');

chai.use(chaiHttp);

describe('Sign Up API: POST /signup', () => {
	/*
	Fake user credentials for testing
	*/
	const validUserCredentials = {
		username: 'djokos',
		passowrd: 'edanaingtea'
	}
	const incompleUserCredentials = {
		username: 'djokos'
	}

	/*
	Empty the database after each test
	*/
	afterEach((done) => {
		models.User.remove({}, (err) => {
			done();
		});
	});

	/*
	Test POST /signup response object
	*/
	it('should generate a generic application response {status, message, payload, err}', (done) => {
		chai.request(app)
		.post('/signup')
		.send(validUserCredentials)
		.end((err, response) => {
			const appResponse = response.body;

			appResponse.should.not.be.empty();

			appResponse.should.be.an('object');
			appResponse.should.have.property('status');
			appResponse.should.have.property('message');
			appResponse.should.have.property('payload');
			appResponse.should.have.property('err');

			appResponse.status.should.be.a('number');
			appResponse.message.should.be.a('string');
			appResponse.payload.should.be.an('object');
			appResponse.err.should.be.an('object');

			done();
		});		
	});

	/*
	Test POST /signup with valid credentials
	*/
	it('should contain jwtoken inside payload if credentials is valid', (done) => {
		chai.request(app)
		.post('/signup')
		.send(validUserCredentials)
		.end((err, response) => {
			const appResponse = response.body;
			const jwtokenDecoded = jwt.verify(payload.jwtoken, process.env.JWT_SECRET_KEY);

			response.status.should.equal(200);

			appResponse.status.should.equal(200);
			appResponse.payload.should.have.property('jwtoken');
			appResponse.err.should.equal(null);

			jwtokenDecoded.should.be.an('object');
			jwtokenDecoded.should.have.property('_id');
			jwtokenDecoded.should.have.property('username');

			done();
		});
	});

	/*
	Test POST /signup with incomplete credentials
	*/
	it('should return an error and not contain any payload if credentials is not valid', (done) => {
		chai.request(app)
		.post('/signup')
		.send(incompleUserCredentials)
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.not.equal(200);

			appResponse.status.should.not.equal(200);
			appResponse.payload.should.not.have.property('jwtoken');
			appResponse.err.should.not.equal(null);

			done();
		});
	});

	/*
	Test POST /signup with duplicate username
	*/
	it('should return an error and not contain any payload if username is not unique', (done) => {
		let user = new models.User(validUserCredentials);
		user.save((err, userCreated) => {
			chai.request(app)
			.post('/signup')
			.send(validUserCredentials)
			.end((err, response) => {
				const appResponse = response.body;

				response.status.should.not.equal(200);

				appResponse.status.should.not.equal(200);
				appResponse.payload.should.not.have.property('jwtoken');
				appResponse.err.should.not.equal(null);

				done();
			});
		});
	});
});