import { Request, Response } from 'express';

import { AnimeService } from '../services/anime.service.js';

export class AnimeController {
    constructor(private service: AnimeService) {}

    async store(req: Request, res: Response) {
        let payload = req.body;

        if (req.file) {
            payload = {
                ...payload,
                thumbnail: req.file.filename,
            };
        }

        const response = await this.service.create(payload);
        return res.status(201).json(response);
    }

    async get(req: Request, res: Response) {
        const data = await this.service.list(req.query);
        return res.status(200).json(data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await this.service.getById(Number(id));

        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        let payload = req.body;

        if (req.file) {
            payload = {
                ...payload,
                thumbnail: req.file.filename,
            };
        }
        const response = await this.service.update(Number(id), payload);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.service.delete(Number(id));
        return res.sendStatus(204);
    }
}
