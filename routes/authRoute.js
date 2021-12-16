const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { requireUser } = require("../middleware/requireUser")

router.post('/register', authController.register)

router.post('/login',authController.login)

router.post('/logout', requireUser, authController.logout)

router.get('/refreshSession', requireUser, authController.getSession)

module.exports = router