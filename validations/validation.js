// Data validation
const Joi = require('@hapi/joi')

const addMeterReadingValidation = Joi.object({
    date: Joi.date()
        .required(),
    meterReading: Joi.number()
        .required()
})

const addElectricalBillValidation = Joi.object({
    date: Joi.date()
        .required(),
    electricalBill: Joi.number()
        .required()
})

const addEquipmentValidation = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
    type: Joi.string()
        .min(2)
        .max(50)
        .required(),
    watts: Joi.number()
        .required(),
    number: Joi.number()
        .required()
})

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
    location: Joi.string()
        .required()
        .min(2)
        .max(50),
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
    loginValidation,
    addEquipmentValidation,
    addElectricalBillValidation,
    addMeterReadingValidation 
}