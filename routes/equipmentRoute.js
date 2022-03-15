const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const equipmentController = require('../controllers/equipmentController')

router.post('/add', requireUser,  equipmentController.addEquipment)
router.post('/getEquipments', requireUser, equipmentController.getEquipments)
router.patch('/updateEquipment/:equipmentId', requireUser, equipmentController.editEquipment)
router.delete('/deleteEquipment/:equipmentId', requireUser, equipmentController.deleteEquipment)
router.get('/getEquipment', requireUser,equipmentController.getEquipment)

module.exports = router