const Equipment = require('../models/equipmentsModel')

const addEquipment = async ( name, type, watts, number, companyId ) => {
    
        const equipment = new Equipment({
            name: name,
            type: type,
            watts: watts,
            number: number,
            companyId: companyId
        })
    try {
        await equipment.save()
        return {
            statusCode: 200,
            message: 'Equipment added successfully'
        }
    } catch (e) {
        console.log(e)

        return {
            statusCode: 500,
            message: 'Internal server error. Equipment not added.'
        }
    }
}

module.exports.addEquipment = addEquipment