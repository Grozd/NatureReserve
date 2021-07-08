const router = require('express').Router()
const controller = require('../controllers/authController')
const authAdmin = require('../middleware/authMiddleware')

// TODO: контроллер не рабочий, в виде примера
router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', authAdmin, controller.getUsers)

module.exports = router