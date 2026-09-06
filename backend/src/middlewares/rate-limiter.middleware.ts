import { Request, Response } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    keyGenerator: (req: Request): string => {
        return ipKeyGenerator(req.ip as string);
    },
    handler: (_, res: Response): void => {
        res.sendStatus(429);
    },
});
