const {
    addMeterReading,
    getMeterReadings,
    updateMeterReading,
    deleteMeterReading
} = require('../utils/meterReadingUtils')
const {
    addMeterReadingValidation
} = require('../validations/validation')

exports.getMeterReadings = async (req, res) => {
    let companyId = req.user._id
    try {
        const response = await getMeterReadings(companyId)
        if (response.meterReadings.length > 0) {
            return res.status(200).json({
                meterReadings: response.meterReadings
            })
        }

        return res.status(204).json({
            message: 'No meter readings found'
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: response.message
        })
    }
}

exports.addMeterReading = async (req, res) => {

    await addMeterReadingValidation.validateAsync(req.body)

    let companyId = req.user._id

    const {
        meterReading,
        date
    } = req.body

    try {
        const response = await addMeterReading(meterReading, date, companyId)

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

exports.editMeterReading = async (req, res) => {
    let companyId = req.user._id
    let meterReadingId = req.params.meterReadingId
    let fields = req.body

    try {
        let updatedMeterReading = await updateMeterReading(companyId, meterReadingId, fields)
        if (updatedMeterReading.statusCode === 200) {
            return res.status(200).json({
                message: 'Meter reading updated successfully.',
                updatedMeterReading: updatedMeterReading
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

exports.deleteMeterReading = async (req, res) => {
    let companyId = req.user._id
    let meterReadingId = req.params.meterReadingId

    try {
        let deletedMeterReading = await deleteMeterReading(companyId, meterReadingId)
        if (deletedMeterReading.statusCode === 200) {
            return res.status(200).json({
                message: 'Electrical bill deleted successfully.',
                deletedMeterReading: deletedMeterReading
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