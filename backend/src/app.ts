import express, { Application, Response } from 'express';
import path from 'node:path';
import { pinoHttp } from 'pino-http';

import { logger } from './config/logger.config.js';
import { V1Routes } from './routes/v1/index.js';
import { notFoundRouteMiddleware } from './middlewares/not-found.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export class App {
    public app: Application;
    private v1Routes = new V1Routes();

    constructor() {
        this.app = express();

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(pinoHttp({ logger }));
    }

    private initializeErrorHandling() {
        this.app.use(notFoundRouteMiddleware);
        this.app.use(errorMiddleware);
    }

    private initializeRoutes() {
        this.app.get('/health-check', (_, res: Response) => {
            res.status(200).json({ message: 'API running well!' });
        });

        this.app.use('/uploads', express.static(path.resolve(__dirname, '../..', 'uploads')));
        this.app.use('/v1', this.v1Routes.router);
    }

    listen(port: string) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}!`);
        });
    }
}
