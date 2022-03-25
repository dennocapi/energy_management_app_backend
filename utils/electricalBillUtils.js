const ElectricalBill = require('../models/electricalBills')

const getElectricalBills = async (companyId) => {
    try {
        let electricalBills = await ElectricalBill.find({
            companyId: companyId
        }).sort('date', 1)
        console.log('Response', electricalBills)
        return {
            statusCode: 200,
            electricalBills: electricalBills
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            message: 'internal server error.'
        }
    }
}

const addElectricalBill = async (amount, date, companyId) => {

    const electricalBill = new ElectricalBill({
        date: date,
        amount: amount,
        companyId: companyId
    })
    try {
        await electricalBill.save()
        return {
            statusCode: 200,
            message: 'Electrical bill added successfully'
        }
    } catch (e) {
        console.log(e)

        return {
            statusCode: 500,
            message: 'Internal server error. Electrical bill not added.'
        }
    }
}

const updateElectricalBill = async (companyId, electricalBillId, fields) => {

    try {
        let updatedElectricalBill = await ElectricalBill.updateOne({
            _id: electricalBillId,
            companyId: companyId
        }, fields)
        console.log(updatedElectricalBill)
        return {
            statusCode: 200,
            updatedElectricalBill: updatedElectricalBill
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            message: 'Internal server error.'
        }
    }
}

const deleteElectricalBill = async (companyId, electricalBillId) => {
    try {
        deletedElectricalBill = await ElectricalBill.deleteOne({
            _id: electricalBillId,
            companyId: companyId
        })
        console.log(deletedElectricalBill)
        return {
            statusCode: 200,
            deletedElectricalBill: deletedElectricalBill
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getElectricalBills,
    addElectricalBill,
    updateElectricalBill,
    deleteElectricalBill
}