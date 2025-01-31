import dotenv from "dotenv"
dotenv.config({
    path: ".env", override: true
})


export const config = {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
    MONGO_URL: process.env.MONGO_URL
}