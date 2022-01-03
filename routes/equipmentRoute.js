const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const equipmentController = require('../controllers/equipmentController')

router.post('/add', requireUser, equipmentController.addEquipment)

module.exports = router