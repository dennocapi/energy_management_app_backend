const {
    addElectricalBill,
    getElectricalBills
} = require('../utils/electricalBillUtils')
const {
    addElectricalBillValidation
} = require('../validations/validation')

exports.getElectricalBills = async (req, res) => {
    let companyId = req.user._id
    try {
        const response = await getElectricalBills(companyId)
        if (response.electricalBills.length > 0) {
            return res.status(200).json({
                electricalBills: response.electricalBills
            })
        }

        return res.status(204).json({
            message: 'No electrical bills found'
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: response.message
        })
    }
}


exports.addElectricalBill = async (req, res) => {

    await addElectricalBillValidation.validateAsync(req.body)
    
    // let companyId = req.user._id
    companyId = '61b21461c6b68fc6a2fbde19'

    const {
        amount,
        date
    } = req.body

    try {
        const response = await addElectricalBill(amount, date, companyId)

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