import express from 'express';

import {
    registerUserController,
    getUserController,
    loginUserController
} from '../controllers/users/index.js';


const router = express.Router();

// Rutas de usuarios
router.post('/users/register', registerUserController );
router.get('/users/:id', getUserController);
router.post('/users/login', loginUserController);


export default router;
