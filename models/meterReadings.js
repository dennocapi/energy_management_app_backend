const mongoose = require('mongoose')

const meterReadingsSchema = mongoose.Schema({
    meterReading: {
        type: Number
    },
    date: {
        type: Date
    },
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
 
}, {
    timestamps: true
})

module.exports = mongoose.model('MeterReadings', meterReadingsSchema)