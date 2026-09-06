import { Request, Response } from 'express';

import { ISeasonPayload } from '../interfaces/season.interface.js';
import { SeasonService } from '../services/season.service.js';

export class SeasonController {
    constructor(private seasonService: SeasonService) {}

    async store(req: Request, res: Response) {
        const { animeId } = req.params;
        const payload: ISeasonPayload = { ...req.body, animeId: Number(animeId) };

        const response = await this.seasonService.create(payload);
        return res.status(201).json(response);
    }

    async get(req: Request, res: Response) {
        const { animeId } = req.params;
        const data = await this.seasonService.listByAnimeId(Number(animeId));
        return res.status(200).json(data);
    }

    async update(req: Request, res: Response) {
        const { animeId, id } = req.params;
        const payload: ISeasonPayload = { ...req.body, animeId: Number(animeId) };

        const response = await this.seasonService.update(Number(id), payload);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.seasonService.delete(Number(id));
        return res.sendStatus(204);
    }
}
