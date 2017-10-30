'use strict'

const jwt = require('jsonwebtoken');

module.exports = user => {
	const data = {
		id: user.id,
		username: user.username,
	}

	return jwt.sign(data, process.env.JWT_SECRET_KEY);
}