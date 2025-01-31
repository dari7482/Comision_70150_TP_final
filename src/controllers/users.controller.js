import { usersService } from "../services/index.js"

const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();
    req.logger.info(`user found`)
    res.send({ status: "success", payload: users })
}

const getUser = async (req, res) => {
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        req.logger.info(`user found`)
        res.send({ status: "success", payload: user })

    } catch (error) {
        req.logger.error(`user Not found: ${error.message}`)
        return res.status(404).send({ status: "error", error: "User not found" })
    }


}

const updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;
    let user
    try {
        user = await usersService.getUserById(userId);

    } catch (error) {
        req.logger.error(`user Not found: ${error.message}`)
        return res.status(404).send({ status: "error", error: "User not found" })
    }

    try {
        const result = await usersService.update(userId, updateBody);
        req.logger.info(`user updated`)
        res.send({ status: "success", message: "User updated" })
    } catch (error) {
        req.logger.error(`user Not updated: ${error.message}`)
        return res.status(404).send({ status: "error", error: "User not updated" })
    }


}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    await usersService.delete(result)
    res.send({ status: "success", message: "User deleted" })
}

const uploadDocument = async (req, res) => {
    const uid = req.params
    const files = req.files



    const fileArray = files.map((file) => {

        file = {
            name: file.originalname,
            reference: file.destination

        }

        return file

    })

    //const userId = await usersService.getUserById(uid.uid);

    await usersService.updateLoad(uid.uid, fileArray);

    res.send({ status: "success" })

}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocument
}