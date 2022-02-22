const ElectricalBill = require('../models/electricalBills')

const getElectricalBills = async (companyId) => {
    try {
        let electricalBills = await ElectricalBill.find({companyId: companyId})
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

const addElectricalBill = async ( amount, date, companyId ) => {
        console.log(companyId)
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

module.exports.getElectricalBills = getElectricalBills
module.exports.addElectricalBill = addElectricalBill