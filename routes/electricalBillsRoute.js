const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const electricalBillController = require('../controllers/electricalBillController')

router.post('/add', requireUser, electricalBillController.addElectricalBill)
router.post('/getElectricalBills', requireUser, electricalBillController.getElectricalBills)

module.exports = router