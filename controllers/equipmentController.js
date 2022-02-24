const {
    addEquipment,
    getEquipments,
    updateEquipment,
    deleteEquipment
} = require('../utils/equipmentUtils')
const {
    addEquipmentValidation
} = require('../validations/validation')

exports.getEquipments = async (req, res) => {
    let companyId = req.user._id
    try {
        const response = await getEquipments(companyId)
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
            message: equipment
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: equipment.message
        })
    }
}

exports.editEquipment = async (req, res) => {
    let companyId = req.user._id
    let equipmentId = req.params.equipmentId
    let fields = req.body

    try {
        let updatedEquipment = await updateEquipment(companyId, equipmentId, fields)
        if (updatedEquipment.statusCode === 200) {
            return res.status(200).json({
                message: 'Equipment updated successfully.',
                updatedEquipment: updatedEquipment
            })
        }
        return res.status(500).json({
            message: 'Internal server error.'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Something went wrong.'
        })
    }
}

exports.deleteEquipment = async (req, res) => {
    let companyId = req.user._id
    let equipmentId = req.params.equipmentId

    try {
        let deletedEquipment = await deleteEquipment(companyId, equipmentId)
        if (deletedEquipment.statusCode === 200) {
            return res.status(200).json({
                message: 'Equipment deleted successfully.',
                deletedEquipment: deletedEquipment
            })
        }
        return res.status(500).json({
            message: 'Internal server error.'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Something went wrong.'
        })
        
    }
}