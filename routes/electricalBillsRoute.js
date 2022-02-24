const express = require('express')
const router = express.Router()
const { requireUser } = require("../middleware/requireUser")

const electricalBillController = require('../controllers/electricalBillController')

router.post('/add', requireUser, electricalBillController.addElectricalBill)
router.post('/getElectricalBills', requireUser, electricalBillController.getElectricalBills)
router.patch('/updateElectricalBill/:electricalBillId', requireUser, electricalBillController.editElectricalBill)
router.delete('/deleteElectricalBill/:electricalBillId', requireUser, electricalBillController.deleteElectricalBill)

module.exports = router