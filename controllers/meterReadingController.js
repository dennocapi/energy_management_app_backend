const {
    addMeterReading
} = require('../utils/meterReadingUtils')
const {
    addMeterReadingValidation
} = require('../validations/validation')

exports.addMeterReading = async (req, res) => {

    await addMeterReadingValidation.validateAsync(req.body)
    
    // let companyId = req.user._id
    let companyId = 1

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