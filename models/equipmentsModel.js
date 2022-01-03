const mongoose = require('mongoose')

const equipmentSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    watts: {
        type: Number
    },
    number: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Equipments', equipmentSchema)