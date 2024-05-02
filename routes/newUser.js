const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/newUserController')

router.post('/', createUser)

module.exports = router
