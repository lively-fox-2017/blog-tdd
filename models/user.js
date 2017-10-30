'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);