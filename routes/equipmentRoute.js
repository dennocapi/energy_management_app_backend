const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const equipmentController = require('../controllers/equipmentController')

router.post('/add',  equipmentController.addEquipment)
router.post('/getEquipments', equipmentController.getEquipments)

module.exports = router