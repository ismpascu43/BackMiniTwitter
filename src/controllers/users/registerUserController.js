import randomstring from 'randomstring';

import insertUserService from '../../services/users/insertUserService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const registerUserController = async (req, res, next) => {

    try {
       const {email, password} = req.body;

       if (!email || !password) throw generateErrorsUtils('Debes enviar un email y una contraseña', 400);

       const registrationCode = randomstring.generate(15);

       await insertUserService(email, password, registrationCode);
         
       res.send({
        status: 'ok',
        message: 'Usuario creado correctamente. Verifique su cuenta mediante el email recibido'
       });
    
    } catch (error) {
        next(error);
    }
}

export default registerUserController;
