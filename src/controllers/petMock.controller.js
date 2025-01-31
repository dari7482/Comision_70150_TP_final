import { TIPOS_ERROR } from "../utils/EErrores.js"
import { createCustomError } from "../utils/CustomError.js"
import { petGenerator } from "../services/petGenerator.js"
//import { getPetService } from "../repositories/index.js"

const getALLpet = async (req, res) => {
    let { quantity } = req.params

    let petArray = []
    for (let i = 0; i < quantity; i++) {
        const pet = await petGenerator();

        petArray.push(pet);
    }

    res.status(200).json(petArray)
}


const createPet = (req, res) => {
    let { owner, adopted, petid, age, type, breed } = req.body
    let result = {
        owner,
        adopted,
        petid,
        age,
        type,
        breed
    }

    res.status(200).json({ result })



}

export default {
    getALLpet,
    createPet



}