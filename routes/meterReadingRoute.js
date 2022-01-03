const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const meterReadingController = require('../controllers/meterReadingController')

router.post('/add', meterReadingController.addMeterReading)
router.post('/getMeterReadings', meterReadingController.getMeterReadings)

module.exports = router