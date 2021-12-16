const mongoose = require('mongoose')

const equipmentSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        typr: String
    },
    category: {
        type: String
    },
    companyId: {
        type: String
    },
    watts: {
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