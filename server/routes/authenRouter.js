const router = require('express').Router()
const controller = require('../controllers/authenController')
const validator = require('../middleware/validator')

router.post('/reg', validator, controller.registration)
router.post('/login', validator, controller.login)

module.exports = router