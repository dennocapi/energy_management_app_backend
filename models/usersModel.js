const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    companyName: {
        type: String
    },
    password: {
        type: String
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)