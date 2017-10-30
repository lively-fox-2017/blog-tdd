'use strict'

const getDbHost = () => {
	switch(process.env.NODE_ENV) {
		case 'production':
			return 'mongodb://localhost/blog_production';
		case 'dev':
			return 'mongodb://localhost/blog_dev';
		case 'test':
			return 'mongodb://localhost/blog_test';
	}
}

const mongoose = require('mongoose');
mongoose.connect(getDbHost());
mongoose.Promise = global.Promise;

module.exports = { };