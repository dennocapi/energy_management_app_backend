const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    companyName: {
        type: String
    },
    location: {
        type: String
    },
    password: {
        type: String
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