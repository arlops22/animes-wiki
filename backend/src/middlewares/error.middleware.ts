import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.config.js';

import { HttpException } from '../interfaces/httpException.interface.js';

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';

    logger.error(error);
    res.status(status).json({ message });
};
