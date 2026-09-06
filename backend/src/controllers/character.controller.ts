import { Request, Response } from 'express';

import { CharacterService } from '../services/character.service.js';

export class CharacterController {
    constructor(private service: CharacterService) {}

    async store(req: Request, res: Response) {
        const { animeId } = req.params;
        const { powers, ...requestBody } = req.body;
        let payload = {
            ...requestBody,
            animeId: Number(animeId),
        };

        if (powers) {
            payload = {
                ...payload,
                powers: JSON.parse(powers),
            };
        }

        if (req.file) {
            payload = {
                ...payload,
                photo: req.file.filename,
            };
        }

        const response = await this.service.create(payload);
        return res.status(201).json(response);
    }

    async get(req: Request, res: Response) {
        const { animeId } = req.params;

        const response = await this.service.listByAnimeId(Number(animeId));
        return res.status(200).json(response);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await this.service.getById(Number(id));
        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {
        const { animeId, id } = req.params;
        const { powers, ...requestBody } = req.body;
        let payload = {
            ...requestBody,
            animeId: Number(animeId),
        };

        if (powers) {
            payload = {
                ...payload,
                powers: JSON.parse(powers),
            };
        }

        if (req.file) {
            payload = {
                ...payload,
                photo: req.file.filename,
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
