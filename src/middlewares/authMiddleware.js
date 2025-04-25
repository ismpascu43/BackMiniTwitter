import jwt from 'jsonwebtoken';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';

const authMiddleware = (req, res, next) => {
    try {
        
        const { authorization } = req.headers;
    
        if(!authorization){
            throw generateErrorsUtils('Se esperaba token por el encabezado', 401);
        }

        let tokenInfo;

        try {
            
            tokenInfo = jwt.verify(authorization, process.env.SECRET);

        } catch (error) {
            console.log(error);
            throw generateErrorsUtils('Credenciales invalidas', 401);
        }
        
        req.user = tokenInfo;

        next();

    } catch (error) {
        next(error);
    }
}

export default authMiddleware;