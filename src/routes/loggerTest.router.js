import { Router } from "express";
import loggerTestController from "../controllers/loggerTest.controller.js";

const router = Router()



router.get('/debbug', loggerTestController.debbug)
router.get('/http', loggerTestController.http)
router.get('/info', loggerTestController.info)
router.get('/warning', loggerTestController.warning)
router.get('/error', loggerTestController.error)
router.get('/fatal', loggerTestController.fatal)

export default router;


