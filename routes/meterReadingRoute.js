const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const meterReadingController = require('../controllers/meterReadingController')

router.post('/add', requireUser, meterReadingController.addMeterReading)
router.post('/getMeterReadings', requireUser, meterReadingController.getMeterReadings)
router.patch('/updateMeterReading/:meterReadingId', requireUser, meterReadingController.editMeterReading)
router.delete('/deleteMeterReading/:meterReadingId', requireUser, meterReadingController.deleteMeterReading)

module.exports = router