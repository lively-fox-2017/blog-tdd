const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/userCtrl');

router.post('/get_authenticate', UserCtrl.authUser);

module.exports = router;
