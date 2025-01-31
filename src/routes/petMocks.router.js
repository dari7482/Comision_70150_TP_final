import { Router } from "express";
import petMockController from '../controllers/petMock.controller.js'


const router = Router()

router.get('/mokingpets/:quantity', petMockController.getALLpet)
router.post('/mokingpets', petMockController.createPet)

export default router;