import express from 'express';

import {
    registerUserController,
    getUserController,
    loginUserController,
    validateUserController
} from '../controllers/users/index.js';


const router = express.Router();

// Rutas de usuarios
router.post('/users/register', registerUserController );
router.get('/users/:id', getUserController);
router.post('/users/login', loginUserController);

router.get('/users/validate/:registrationCode', validateUserController);


export default router;
