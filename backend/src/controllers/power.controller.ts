import { Request, Response } from 'express';

import { PowerService } from '../services/power.service.js';

export class PowerController {
    constructor(private powerService: PowerService) {}

    async create(req: Request, res: Response) {
        const { animeId } = req.params;

        const response = await this.powerService.create({
            animeId: Number(animeId),
            ...req.body,
        });
        return res.status(201).json(response);
    }

    async list(req: Request, res: Response) {
        const { animeId } = req.params;

        const response = await this.powerService.listByAnimeId(Number(animeId));

        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {
        const { id, animeId } = req.params;

        const response = await this.powerService.update(Number(id), {
            animeId: Number(animeId),
            ...req.body,
        });

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await this.powerService.delete(Number(id));

        return res.sendStatus(204);
    }
}
