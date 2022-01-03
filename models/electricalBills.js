const mongoose = require('mongoose')

const electricalBillsSchema = mongoose.Schema({
    amount: {
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

module.exports = mongoose.model('ElectricalBills', electricalBillsSchema)