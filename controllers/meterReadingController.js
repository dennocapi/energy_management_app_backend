const {
    addMeterReading, getMeterReadings
} = require('../utils/meterReadingUtils')
const {
    addMeterReadingValidation
} = require('../validations/validation')

exports.getMeterReadings = async (req, res) => {
    try {
        const response = await getMeterReadings()
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
    
    // let companyId = req.user._id
    let companyId = '61b21461c6b68fc6a2fbde19'

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