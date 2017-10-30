const express = require('express')
const router = express.Router()
const AuthCtrl = require('../controllers/authCtrl')

router.post('/login', AuthCtrl.login);
router.post('/register', AuthCtrl.register);

module.exports = router;
