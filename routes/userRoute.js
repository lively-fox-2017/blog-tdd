const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/userCtrl');

router.post('/add_user', UserCtrl.addUser);

module.exports = router;
