import express from 'express';
import morgan from 'morgan';
import path from 'path';
import userRouter from './routes/userRouter.js';

const server = express();

server.use(express.json());
server.use(morgan('dev'));

const staticDir = path.join(process.cwd(), './src/uploads');
server.use('/uploads', express.static(staticDir));

server.use(userRouter);

server.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

// eslint-disable-next-line no-unused-vars
server.use((error, req, res, next) => {
    console.log(error);
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});

export default server;
