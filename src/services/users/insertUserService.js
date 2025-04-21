import bcrypt from 'bcrypt';

import getPool from "../../database/getPool.js";
import sendMailBrevoUtils from '../../utils/sendMailBrevoUtils.js';
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const insertUserService = async (email, password, registrationCode) => {

    const pool = await getPool();
    // Comprobar si el email ya existe
    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if (user.length) throw generateErrorsUtils('El email ya se encuentra registrado', 409);

       /**Logica para envío de Email */
       const emailSubject = 'Activa tu cuenta de Diario de Viajes';

       const emailBody = `
           <html>
               <body>
                   <h2>Bienvenid@ ${email}</h2>
                   <p>
                       Gracias por registrarte a Diario de viajes. Para activar tu cuenta
                       debe hacer click en el siguiente enlace:
                   </p>
                   <p>
                       <a href="http://localhost:3001/users/validate/${registrationCode}">
                           Activar Cuenta
                       </a>
                       Hecho con ❤ por equipo de Diario de Viajes.
                   </p>
               </body>
           </html>
       `;
   
       await sendMailBrevoUtils(email, emailSubject, emailBody);

    // Encriptar la contraseña
    const passwordHassed = await bcrypt.hash(password, 10);

    // Crear el usuario
    await pool.query(
        `
            INSERT INTO users (email, password)
            VALUES (?, ?)
        `,
        [email, passwordHassed]
    );

}

export default insertUserService;
