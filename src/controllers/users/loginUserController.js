import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import getUserByEmailService from "../../services/users/getUserByEmailService.js";


const loginUserController = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if(!email || !password) throw generateErrorsUtils('Se esperaba email y password', 400);
        // Recojo los datos de la base de datos del usuario con ese email
        const user = await getUserByEmailService(email);

        // Compruebo si la contraseña es correcta
        let validPassword;

        if(user){
            validPassword = await bcrypt.compare(password, user.password);
        }

        if(!user || !validPassword){
            throw generateErrorsUtils('Email o contraseña incorrectos', 401);
        }

        if(!user.active){
            throw generateErrorsUtils('Usuario pendiente de activacion', 403);
        }

       // Genera el token
       const tokenInfo = {
        id: user.id,
        role: user.role,
       }

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '3d'
        });

        // Envio el token
        res.send({
            status: 'ok',
            data: token
            
        })
    } catch (error) {
        next(error);
    }

}

export default loginUserController;
