import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from "winston"
import { config } from "./config/config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "error",
            filename: "./src/logs/errors.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
})

const transporteConsola = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    )
})

if (config.MODE == "dev") {
    logger.add(transporteConsola)
}

export const middLogg = (req, res, next) => {
    req.logger = logger
    next()
}

const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        fatal: "red",
        warning: "yellow",
        debug: "green",
        info: "blue",
        red: "orange",
        http: "pink"
    }
}

/*const loggerCustomizado = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "leve",
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevels.colors
                }),
                winston.format.simple()
            )
        })
    ]
})

loggerCustomizado.leve("Prueba error leve")
loggerCustomizado.intermedio("Prueba error intermedio")
loggerCustomizado.critico("Prueba error grave")*/
