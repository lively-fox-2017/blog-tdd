'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');
const generateJwtoken = require('./../helpers/generate-jwtoken');

class User {
	static signup(req, res) {
		const user = req.body;
		models.User.create(user)
		.then(createdUser => {
			const user = {
				id: createdUser._id,
				username: createdUser.username
			}

			return generateJwtoken(user);	
		})
		.then(jwtoken => {
			const payload = { jwtoken };
			const resp = generateResponse(200, 'signing up', payload, null);
			res.status(200).send(resp);
		})
		.catch(err => {
			const resp = generateResponse(409, 'failed signing up', null, err);
			res.status(409).send(resp);
		});
	}

	static signin(req, res) {
		const username = req.body.username;
		models.User.findOne({username: req.body.username})
		.then(user => {
			if (!user) reject('user not found');
			if (user.password !== req.body.password) reject('wrong password');
			const returnedUser = {
				id: user._id,
				username: user.username
			}

			return generateJwtoken(returnedUser);
		})
		.then(jwtoken => {
			const payload = { jwtoken };
			const resp = generateResponse(200, 'signing in', payload, null);
			res.status(200).send(resp);
		})
		.catch(err => {
			const resp = generateResponse(422, 'failed signing in', null, err);
			res.status(422).send(resp);
		});
	}
}

module.exports = User;