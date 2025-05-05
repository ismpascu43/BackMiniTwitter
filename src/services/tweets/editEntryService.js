import getPool from "../../database/getPool.js";

const editTweetsService = async (text, image, tweetId) => {
    
    const pool = await getPool();

    await pool.query(
        `
            UPDATE tweets
            SET text=?, image=?, 
            WHERE id=?
        `,
        [text, image, tweetId]
    );

}

export default editTweetsService;