'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const jwt = require('jsonwebtoken');

const app = require('./../app');
const models = require('./../models');

chai.use(chaiHttp);

describe('Sign In API: POST /signin', () => {
	/*
	Fake user credentials for testing
	*/
	const validUserCredentials = {
		username: 'djokos',
		password: 'edanaingtea'
	};
	const invalidUsername = {
		username: 'djokosss',
		password: 'edanaingtea'
	};
	const invalidPassword = {
		username: 'djokos',
		password: 'uhuy'
	};
	const incompleteUserCredentials = {
		username: 'djokos'
	};

	/*
	Before all test, create a new record of User with validUserCredentials for testing
	*/
	before(done => {
		let user = new models.User(validUserCredentials);
		user.save((err, userCreated) => {
			done();
		});
	})

	/*
	After all test, empty the database
	*/
	after(done => {
		models.User.remove({}, (err) => {
			done();
		});
	});

	/*
	Test POST /signin response object
	*/
	it('should generate a generic application response {status, message, payload, err}', (done) => {
		chai.request(app)
		.post('/signin')
		.send(validUserCredentials)
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
	Test POST /signin with valid credentials
	*/
	it('should contain jwtoken inside payload if credentials are valid', (done) => {
		chai.request(app)
		.post('/signin')
		.send(validUserCredentials)
		.end((err, response) => {
			const appResponse = response.body;
			const jwtokenDecoded = jwt.verify(appResponse.payload.jwtoken, process.env.JWT_SECRET_KEY);

			response.status.should.equal(200);

			appResponse.status.should.equal(200);
			appResponse.payload.should.have.property('jwtoken');
			should.not.exist(appResponse.err);

			jwtokenDecoded.should.be.an('object');
			jwtokenDecoded.should.have.property('id');
			jwtokenDecoded.should.have.property('username');

			done();
		});
	});

	/*
	Test POST /signin with invalid username
	*/
	it('should return an error and not contain any payload if username is invalid', (done) => {
		chai.request(app)
		.post('/signin')
		.send(invalidUsername)
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.equal(422);

			appResponse.status.should.equal(422);
			should.not.exist(appResponse.payload);
			should.exist(appResponse.err);

			done();
		});
	});

	/*
	Test POST /signin with invalid password
	*/
	it('should return an error and not contain any payload if password is invalid', (done) => {
		chai.request(app)
		.post('/signin')
		.send(invalidPassword)
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.equal(422);

			appResponse.status.should.equal(422);
			should.not.exist(appResponse.payload);
			should.exist(appResponse.err);

			done();
		});
	});

	/*
	Test POST /signin with incomplete credentials
	*/
	it('should return an error and not contain ny payload if credentials are incomplete', (done) => {
		chai.request(app)
		.post('/signin')
		.send(incompleteUserCredentials)
		.end((err, response) => {
			const appResponse = response.body;

			response.status.should.equal(422);

			appResponse.status.should.equal(422);
			should.not.exist(appResponse.payload);
			should.exist(appResponse.err);

			done();
		});
	});
});