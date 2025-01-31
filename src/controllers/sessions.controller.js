import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,

        }
        let result = await usersService.create(user);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        res.send({ status: "error", payload: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });

    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
    await usersService.update(user._id, { last_connection: new Date() })

    res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in", payload: userDto })
}

const current = async (req, res) => {
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user)
        return res.send({ status: "success", payload: user })
}

const unprotectedLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
    await usersService.update(user._id, { last_connection: new Date() })
    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" })
}
const unprotectedCurrent = async (req, res) => {
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user)
        return res.send({ status: "success", payload: user })
}
const logout = async (req, res) => {
    const cookie = req.cookies['coderCookie']
    try {
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        const findUser = await usersService.getUserByEmail(user.email);
        const userLastconn = await usersService.update(findUser._id, { last_connection: new Date() })
        const userDto = UserDTO.getUserTokenFrom(userLastconn);
        res.clearCookie('token');
        return res.send({ status: "success", payload: userDto })

    } catch (error) {
        return res.status(401).send({ status: "error", error: "cookie not valid", payload: error.message });

    }


}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent,
    logout
}