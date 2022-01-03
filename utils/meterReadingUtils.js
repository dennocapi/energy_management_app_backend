const MeterReading = require('../models/meterReadings')

const addMeterReading = async ( reading, date, companyId ) => {
    
        const meterReading = new MeterReading({
            meterReading: reading,
            date: date,
            companyId: companyId
        })
    try {
        await meterReading.save()
        return {
            statusCode: 200,
            message: 'Meter reading added successfully'
        }
    } catch (e) {
        console.log(e)

        return {
            statusCode: 500,
            message: 'Internal server error. Meter reading not added.'
        }
    }
}

module.exports.addMeterReading = addMeterReading