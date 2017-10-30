var express = require('express');
var router = express.Router();
const User = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', User.register);
router.post('/login', User.login);

module.exports = router;
