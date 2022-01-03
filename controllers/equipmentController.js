const {
    addEquipment
} = require('../utils/equipmentUtils')
const {
    addEquipmentValidation
} = require('../validations/validation')

exports.addEquipment = async (req, res) => {

    await addEquipmentValidation.validateAsync(req.body)
    
    let companyId = req.user._id

    const {
        name,
        type,
        watts,
        number
    } = req.body

    try {
        const equipment = await addEquipment(name, type, watts, number, companyId)

        return res.status(200).json({
            message: equipment.message
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: equipment.message
        })
    }
}