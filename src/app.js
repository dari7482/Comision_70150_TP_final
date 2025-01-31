import express from 'express';
import __dirname, { logger, middLogg } from './utils.js';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksPetRouter from './routes/petMocks.router.js'
import mocksUserRouter from './routes/userMocks.router.js'
import loggerTestRouter from './routes/loggerTest.router.js'
import mocksGenerateDataRouter from './routes/generateDataMoks.router.js'
import { errorHandler } from "./middleware/errorHandler.js";
import { conectaDB } from './database.js';
import apiDocuemnt from './utils/api.dcoument.js'
import swaggerJsdocs from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { fileURLToPath } from 'url';
import { config } from "./config/config.js"



const __filename = fileURLToPath(import.meta.url);

const app = express();
app.use(middLogg)


const specs = swaggerJsdocs(apiDocuemnt)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))


const PORT = config.PORT
const MONGO_URL = config.MONGO_URL



app.use(express.json());
app.use(cookieParser());
conectaDB(MONGO_URL)


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks/pet', mocksPetRouter)
app.use('/api/mocks/user', mocksUserRouter)
app.use('/api/mocksData', mocksGenerateDataRouter)
app.use('/api/loggerTest', loggerTestRouter)

app.use((req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found.`);
    error.status = 404;
    next(error);
});

app.use(errorHandler)

app.listen(PORT, () => logger.info(`Listening on ${PORT}`))
