import { Router } from 'express';
//import multer from 'multer';
import usersController from '../controllers/users.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/', usersController.getAllUsers);
router.get('/:uid', usersController.getUser);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);
router.post('/:uid/documents', uploader.array('file'), usersController.uploadDocument)


export default router;