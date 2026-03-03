import express from 'express';
import {
    adminPage,
    getEditUser,
    editUser,
    deleteUser
} from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', adminAuth, adminPage);
router.get('/editUser/:id', adminAuth, getEditUser);
router.post('/editUser/:id', adminAuth, editUser);
router.post('/delete/:id', adminAuth, deleteUser);

export default router;