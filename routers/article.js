const express = require('express')
const router = express.Router()
const BlogCtrl = require('../controllers/blogCtrl')
const Image = require('../helpers/imageHelper')

router.post('/', Image.multer.single('imageFile'),Image.sendUploadToGCS, BlogCtrl.create);
router.get('/', BlogCtrl.read);
router.get('/:id', BlogCtrl.readOne);
router.get('/user/:user_id', BlogCtrl.readByUserId);
router.delete('/:id', BlogCtrl.delete);
router.put('/:id', Image.multer.single('imageFile'), Image.sendUploadToGCS, BlogCtrl.update);

module.exports = router;
