const router = require('express').Router()
const authRouter = require('./authRouter')
const animalsRouter = require('./animalsRouter')

router.use('/animals', animalsRouter)
router.use('/auth', authRouter) //TODO: доделать маршрут и его обработчик

module.exports = router