import express from 'express';

import {
    newTweetController,
    listTweetsController,
    getTweetController,
    editTweetsController,
    deleteTweetController
} from '../controllers/tweets/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import tweetsExistsMiddleware from '../middlewares/tweetsExistsMiddleware.js';

const router = express.Router();

// Rutas de tweets
router.post('/tweets', authMiddleware, newTweetController);

router.get('/tweets', listTweetsController);
router.get('/tweets/:tweetId',tweetsExistsMiddleware, getTweetController);

router.put('/tweets/:tweetId/edit',
    authMiddleware,
    tweetsExistsMiddleware,
    editTweetsController
);

router.delete('/tweets/:tweetId/delete', deleteTweetController);



export default router;
