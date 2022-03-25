const MeterReading = require('../models/meterReadings')

const getMeterReadings = async (companyId) => {
    try {
        let meterReadings = await MeterReading.find({
            companyId: companyId
        }).sort('date', 1)
        return {
            statusCode: 200,
            meterReadings: meterReadings
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            message: 'internal server error.'
        }
    }
}

const addMeterReading = async (reading, date, companyId) => {

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

const updateMeterReading = async (companyId, meterReadingId, fields) => {

    try {
        let updatedMeterReading = await MeterReading.updateOne({
            _id: meterReadingId,
            companyId: companyId
        }, fields)
        console.log(updatedMeterReading)
        return {
            statusCode: 200,
            updatedElectricalBill: updatedMeterReading
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            message: 'Internal server error.'
        }
    }
}

const deleteMeterReading = async (companyId, meterReadingId) => {
    try {
        deletedMeterReading = await MeterReading.deleteOne({
            _id: meterReadingId,
            companyId: companyId
        })
        console.log(deletedMeterReading)
        return {
            statusCode: 200,
            deletedMeterReading: deletedMeterReading
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    getMeterReadings,
    addMeterReading,
    updateMeterReading,
    deleteMeterReading
}