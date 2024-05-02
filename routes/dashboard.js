const express = require('express')
const { handleDashboard } = require('../controllers/dashboardController')
const { verifyJWT } = require('../middleware/verifyJWT')
const router = express.Router()

router.get('/', verifyJWT, handleDashboard)

module.exports = router
