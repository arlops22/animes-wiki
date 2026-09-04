import { Request, Response } from 'express';

export const notFoundRouteMiddleware = (req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found!' });
};
