const {
    addEquipment,
    getEquipments
} = require('../utils/equipmentUtils')
const {
    addEquipmentValidation
} = require('../validations/validation')

exports.getEquipments = async (req, res) => {
    try {
        const response = await getEquipments()
        if (response.equipments.length > 0) {
            return res.status(200).json({
                equipments: response.equipments
            })
        }

        return res.status(204).json({
            message: 'No equipments found'
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: response.message
        })
    }
}

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