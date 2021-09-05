const router = require('express').Router()
const authenRouter = require('./authenRouter')
const animalsRouter = require('./animalsRouter')
const authorizRouter = require('./authorizRouter')

router.use('/authentication', authenRouter)
router.use('/animals', animalsRouter)
router.use('/authorization', authorizRouter)

module.exports = router