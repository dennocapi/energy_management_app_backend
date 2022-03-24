const Equipment = require('../models/equipmentModel')

const getEquipments = async (companyId) => {
    try {
        let equipments = await Equipment.find({
            companyId: companyId
        })
        return {
            statusCode: 200,
            equipments: equipments
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            message: 'internal server error.'
        }
    }
}

const addEquipment = async (name, type, watts, number, usage, companyId) => {

    const equipment = new Equipment({
        name: name,
        type: type,
        watts: watts,
        number: number,
        usage: usage,
        companyId: companyId
    })
    try {
        await equipment.save()
        return {
            statusCode: 200,
            equipment: equipment
        }
    } catch (e) {
        console.log(e)

        return {
            statusCode: 500,
            message: 'Internal server error.'
        }
    }
}

const updateEquipment = async (companyId, equipmentId, fields) => {

    try {
        let updatedEquipment = await Equipment.updateOne({
            _id: equipmentId,
            companyId: companyId
        }, fields)
        console.log(updatedEquipment)
        return {
            statusCode : 200,
            equipment: updatedEquipment
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            message: 'Internal server error.'
        }
    }
}

const deleteEquipment = async (companyId, equipmentId) => {
    try {
        deletedEquipment = await Equipment.deleteOne({
            _id: equipmentId,
            companyId: companyId
        })
        console.log(deletedEquipment)
        return {
            statusCode : 200,
            deletedEquipment: deletedEquipment
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    addEquipment,
    getEquipments,
    updateEquipment,
    deleteEquipment
}