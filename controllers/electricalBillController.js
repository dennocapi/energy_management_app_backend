const {
    addElectricalBill
} = require('../utils/electricalBillUtils')
const {
    addElectricalBillValidation
} = require('../validations/validation')

exports.addElectricalBill = async (req, res) => {

    await addElectricalBillValidation.validateAsync(req.body)
    
    // let companyId = req.user._id
    companyId = '61b21461c6b68fc6a2fbde19'

    const {
        electricalBill,
        date
    } = req.body

    try {
        const response = await addElectricalBill(electricalBill, date, companyId)

        return res.status(200).json({
            message: response.message
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: response.message
        })
    }
}