const express = require('express');
const router = express.Router();
const user = require('../controller/user');

router.get('/',user.findAll);
router.post('/signin',user.signin);
router.post('/signup',user.signup);
// router.post('/FB',signin.signinFB);

module.exports = router;
