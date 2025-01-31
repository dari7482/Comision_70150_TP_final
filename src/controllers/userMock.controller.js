import { TIPOS_ERROR } from "../utils/EErrores.js"
import { createCustomError } from "../utils/CustomError.js"
import { userGenerator } from "../services/userGenerator.js"

//import UsersDTO from "../dao/DTO/users.dto.js"
import bcrypt from 'bcrypt'



const getALLuser = async (req, res) => {
    let { quantity } = req.params

    if (quantity > 50 || quantity <= 0) {

        return createCustomError("Quantity out of range", "params should be <50 or > 0", "invalid Quantity", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
    }
    let userArray = []
    try {
        for (let i = 0; i < quantity; i++) {
            const user = await userGenerator();
            userArray.push(user);
        }


        res.status(200).json(userArray);
    } catch (error) {
        res.status(500).json({ error: createCustomError("Error to generate user", "error", error.message, TIPOS_ERROR.NOT_FOUND) });
    }
}


export default {
    getALLuser,



}