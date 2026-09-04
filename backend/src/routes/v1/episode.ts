import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../../database/prisma-client.js';

import { ISeasonsRepository } from '../../interfaces/season.interface.js';
import { SeasonsRepositoryPrisma } from '../../repositories/seasons.repository.js';
import { EpisodeController } from '../../controllers/episode.controller.js';
import { EpisodeService } from '../../services/episode.service.js';
import { EpisodesRepositoryPrisma } from '../../repositories/episodes.repository.js';
import { IEpisodesRepository } from '../../interfaces/episode.interface.js';
import { validatorMiddleware } from '../../middlewares/validator.middleware.js';
import { rateLimitMiddleware } from '../../middlewares/rate-limiter.middleware.js';

export class EpisodeRoutes {
    public router: Router;
    private seasonRepository: ISeasonsRepository;
    private episodeRepository: IEpisodesRepository;
    private episodeService: EpisodeService;
    private episodeController: EpisodeController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.seasonRepository = new SeasonsRepositoryPrisma(prisma);
        this.episodeRepository = new EpisodesRepositoryPrisma(prisma);
        this.episodeService = new EpisodeService(this.episodeRepository, this.seasonRepository);
        this.episodeController = new EpisodeController(this.episodeService);
        this.initRoutes();
    }

    private validatePayload() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('releaseDate').notEmpty().withMessage('Release date is required'),
            body('synopsis').notEmpty().withMessage('Synopsis is required'),
            validatorMiddleware,
        ];
    }

    initRoutes() {
        this.router.post('/', rateLimitMiddleware, this.validatePayload(), this.episodeController.store.bind(this));
        this.router.delete('/:id', this.episodeController.delete.bind(this));
        this.router.patch('/:id', this.validatePayload(), this.episodeController.update.bind(this));
    }
}
