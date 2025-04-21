import express from 'express';

import tweetsRouter from './tweetsRouter.js';
import usersRouter from './usersRouter.js';

const router = express.Router();

router.use(tweetsRouter);
router.use(usersRouter);

export default router;
