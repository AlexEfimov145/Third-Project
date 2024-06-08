process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

import express from "express";
import authRouter from './routers/auth';
import vacationsRouter from './routers/vacations'
import followersRouter from './routers/followers'
import config from 'config';
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import userLogger from "./middlewares/user-logger";
import authentication from "./middlewares/authentication";
import expressFileUpload from 'express-fileupload';
import path from "node:path";
import cors from 'cors';

const server = express();
server.use(cors());
server.use(authentication);
server.use(userLogger);
server.use(express.json());
server.use(expressFileUpload())

server.use('/api', authRouter)
server.use('/api/vacations', vacationsRouter)
server.use('/api/followers', followersRouter);
server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))))
server.use('/css', express.static('src/assets/css'))
// special middleware for not found error
server.use(notFound)

// error middlewares
server.use(errorHandler)

export default server;


