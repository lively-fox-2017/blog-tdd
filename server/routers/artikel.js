const express = require('express')
const router = express.Router()
const artikel = require('../controllers/artikel.js')

router.post('/',artikel.addArtikel)
router.get('/',artikel.getArtikel)
router.get('/:id',artikel.findArtikel)
router.put('/:id',artikel.updateArtikel)
router.delete('/:id',artikel.deleteArtikel)

module.exports = router
