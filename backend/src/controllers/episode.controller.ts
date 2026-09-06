import { Request, Response } from 'express';

import { EpisodeService } from '../services/episode.service.js';
import { IEpisodePayload } from '../interfaces/episode.interface.js';

export class EpisodeController {
    constructor(private episodeService: EpisodeService) {}

    async store(req: Request, res: Response) {
        const { seasonId } = req.params;
        const payload: IEpisodePayload = {
            ...req.body,
            seasonId: Number(seasonId),
        };

        const response = await this.episodeService.create(payload);
        return res.status(201).json(response);
    }

    async update(req: Request, res: Response) {
        const { seasonId, id } = req.params;
        const payload: IEpisodePayload = {
            ...req.body,
            seasonId: Number(seasonId),
        };

        const response = await this.episodeService.update(Number(id), payload);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.episodeService.delete(Number(id));
        return res.sendStatus(204);
    }
}
