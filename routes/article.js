const express = require("express")
const router = express.Router()
const controller = require('../controllers/article')
router.post('/', controller.add_data) 
router.put('/:id', controller.edit_data) 
router.get('/', controller.get_all) 
router.get('/:id', controller.get_one) 
module.exports = router