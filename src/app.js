import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

import './database';
import redisConfig from './config/redis';
class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(helmet());
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(new RateLimit({
            store: new RateLimitRedis({
                client: redis.createClient(redisConfig)
            }),
            windowMs: 1000* 60 * 30,
            max: 5,
        }));

        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
    }

    routes(){
        this.server.use(routes);
    }

}

export default new App().server;