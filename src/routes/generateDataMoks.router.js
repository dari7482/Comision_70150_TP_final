import { Router } from "express";
import genarateDataMockController from "../controllers/genarateDataMock.controller.js";

const router = Router()


router.post('/generateData', genarateDataMockController.createGenerateData)

export default router;