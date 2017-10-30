var express = require('express');
var router = express.Router();
const controller = require('../controller/articleController')

router.get('/', controller.findAll)

router.get('/:id', controller.findOne)

router.post('/insert', controller.insert)

router.put('/update/:id', controller.update)

router.delete('/delete/:id', controller.delete)

module.exports = router
