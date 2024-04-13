const express = require('express')
const router = express.Router()

router.use('/v1',require('./authen'))
router.use('/v1',require('./product'))
router.use('/v1',require('./category'))
router.use('/v1',require('./cart.route'))

module.exports = router