import express from 'express';
import {
    getHome,
    getRegister,
    getLogin,
    register,
    login,
    dashboard,
    logout
} from '../controllers/authController.js';

import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getHome);
router.get('/register', getRegister);
router.get('/login', getLogin);
router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', auth, dashboard);
router.get('/logout', logout);

export default router;