const express = require('express')
const { verifyJWT } = require('../middleware/verifyJWT')
const { handleRefreshToken } = require('../controllers/handleRefreshToken')
const router = express.Router()

router.get('/', handleRefreshToken)

module.exports = router
