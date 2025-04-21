import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const selectUserByIdService = async (email) => {

    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id, password, role, recoverPassCode, active
            FROM users
            WHERE email=?
        `,
        [email]
    );

    if(!user.length){
        throw generateErrorsUtils('No existe un usuario con ese email', 404);
    }

    return user[0];
}

export default selectUserByIdService;