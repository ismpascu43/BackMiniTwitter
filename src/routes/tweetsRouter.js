import express from 'express';

import {
    newTweetController,
    listTweetsController,
    getTweetController,
    deleteTweetController
} from '../controllers/tweets/index.js';

const router = express.Router();

// Rutas de tweets
router.post('/tweets', newTweetController);

router.get('/tweets', listTweetsController);
router.get('/tweets/:tweetId', getTweetController);

router.delete('/tweets/:tweetId/delete', deleteTweetController);



export default router;
