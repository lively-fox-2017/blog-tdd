const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/userCtrl')

router.post('/', UserCtrl.create);
router.get('/', UserCtrl.read);
router.get('/:id', UserCtrl.readOne);
router.put('/:id', UserCtrl.update);
router.delete('/:id', UserCtrl.delete);

module.exports = router;
