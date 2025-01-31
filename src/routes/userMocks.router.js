import { Router } from "express";
import userMockController from "../controllers/userMock.controller.js";


const router = Router();


router.get('/mokingUser/:quantity', userMockController.getALLuser)

export default router
