const ElectricalBill = require('../models/electricalBills')

const addElectricalBill = async ( bill, date, companyId ) => {
    
        const electricalBill = new ElectricalBill({
            date: date,
            electricalBill: bill,
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

module.exports.addElectricalBill = addElectricalBill