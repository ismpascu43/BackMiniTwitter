import express from 'express';

import {
    registerUserController,
    getUserController,
    loginUserController,
    validateUserController,
    editUserAvatarController
} from '../controllers/users/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rutas de usuarios
router.post('/users/register', registerUserController );
router.get('/users/:id', getUserController);
router.post('/users/login', loginUserController);

router.get('/users/validate/:registrationCode', validateUserController);
router.put('/users/avatar', authMiddleware, editUserAvatarController);


export default router;
