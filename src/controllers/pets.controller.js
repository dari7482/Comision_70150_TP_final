import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
    console.log('pets')

    const pets = await petsService.getAll();
    console.log(pets)
    res.status(200).json({ message: 'Lista de Mascotas', payload: pets });

}

const createPet = async (req, res) => {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" })
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);
    res.status(201).json({ message: 'Mascota creada', payload: pet });
}

const updatePet = async (req, res) => {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    try {
        await petsService.update(petId, petUpdateBody);
        res.status(200).json({ message: "pet updated" })
    } catch (error) {

        req.logger.error(error.message)

        res.status(400).send({ status: "error", error: "ID mascota no encotrada" })


    }

}

const deletePet = async (req, res) => {
    const petId = req.params.pid;
    try {
        await petsService.delete(petId);
        res.status(200).json({ message: "pet deleted" })
    } catch (error) {
        req.logger.error(error.message)

        res.status(400).send({ status: "error", error: "ID mascota no encotrada" })

    }
}

const createPetWithImage = async (req, res) => {
    const file = req.file;
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" })
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image: `${__dirname}/../public/img/${file.filename}`
    });
    const result = await petsService.create(pet);
    res.send({ status: "success", payload: result })
}
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}