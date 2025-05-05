import getPool from '../../database/getPool.js';

const createTweetService = async (userId, text, image) => {

    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO tweets (userId, text, image)
            VALUES (?,?,?)
        `,
        [userId, text, image]
    );

    const {insertId} = result;

    return insertId;
}

export default createTweetService;