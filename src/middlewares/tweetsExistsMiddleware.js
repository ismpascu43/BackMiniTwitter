import getPool from "../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const tweetsExistsMiddleware = async (req, res, next) => {
    try {
        
        const pool = await getPool();

        const {tweetId} = req.params;

        const [tweet] = await pool.query(
            `
                SELECT id FROM tweets WHERE id=?
            `,
            [tweetId]
        );

        if(!tweet.length) throw generateErrorsUtils('Entrada no encontrada', 404);

        next();

    } catch (error) {
        next(error);
    }
}

export default tweetsExistsMiddleware;