// Data validation
const Joi = require('@hapi/joi')



const registerValidation = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .min(6)
        .required(),
    companyName: Joi.string()
        .required()
        .min(2)
        .max(50),
    phone: Joi.string()
        .min(13)
        .max(13)
        .required(),
    password: Joi.string()
        .required()
        .min(6)
})

const loginValidation = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .min(6)
        .required(),
    password: Joi.string()
        .min(6)
        .required()
})

module.exports = {
    registerValidation,
    loginValidation
}