const router = require('express').Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const adsController = require('./controllers/adsController')


router.use(homeController)
router.use('/auth', authController)
router.use('/ads', adsController)


module.exports = router