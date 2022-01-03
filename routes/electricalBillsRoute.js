const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const electricalBillController = require('../controllers/electricalBillController')

router.post('/add',  electricalBillController.addElectricalBill)
router.post('/getElectricalBills', electricalBillController.getElectricalBills)

module.exports = router