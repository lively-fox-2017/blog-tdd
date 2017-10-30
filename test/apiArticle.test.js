var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var app = require('../app')

chai.use(chaiHttp)

describe('post new article route')
