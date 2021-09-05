const router = require('express').Router()
const controller = require('../controllers/autirizController')

router.get('/', controller.check)
router.post('/', controller.check)

module.exports = router