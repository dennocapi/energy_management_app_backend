const {
    addElectricalBill,
    getElectricalBills,
    updateElectricalBill,
    deleteElectricalBill,
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
    
    let companyId = req.user._id

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

exports.editElectricalBill = async (req, res) => {
    let companyId = req.user._id
    let electricalBillId = req.params.electricalBillId
    let fields = req.body

    try {
        let updatedElectricalBill = await updateElectricalBill(companyId, electricalBillId, fields)
        if (updatedElectricalBill.statusCode === 200) {
            return res.status(200).json({
                message: 'Electrical bill updated successfully.',
                updatedElectricalBill: updatedElectricalBill
            })
        }
        return res.status(500).json({
            message: 'Internal server error.'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Something went wrong.'
        })
    }
}

exports.deleteElectricalBill = async (req, res) => {
    let companyId = req.user._id
    let electricalBillId = req.params.electricalBillId

    try {
        let deletedElectricalBill = await deleteElectricalBill(companyId, electricalBillId)
        if (deletedElectricalBill.statusCode === 200) {
            return res.status(200).json({
                message: 'Electrical bill deleted successfully.',
                deletedElectricalBill: deletedElectricalBill
            })
        }
        return res.status(500).json({
            message: 'Internal server error.'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Something went wrong.'
        })
        
    }
}