import { Router } from 'express';
import { prisma } from '../../database/prisma-client.js';
import { body } from 'express-validator';

import { ISeasonsRepository } from '../../interfaces/season.interface.js';
import { SeasonController } from '../../controllers/season.controller.js';
import { SeasonService } from '../../services/season.service.js';
import { SeasonsRepositoryPrisma } from '../../repositories/seasons.repository.js';
import { IAnimesRepository } from '../../interfaces/anime.interface.js';
import { AnimesRepositoryPrisma } from '../../repositories/animes.repository.js';
import { validatorMiddleware } from '../../middlewares/validator.middleware.js';
import { rateLimitMiddleware } from '../../middlewares/rate-limiter.middleware.js';

export class SeasonRoutes {
    public router: Router;
    private animeRepository: IAnimesRepository;
    private seasonRepository: ISeasonsRepository;
    private seasonService: SeasonService;
    private seasonController: SeasonController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.animeRepository = new AnimesRepositoryPrisma(prisma);
        this.seasonRepository = new SeasonsRepositoryPrisma(prisma);
        this.seasonService = new SeasonService(this.seasonRepository, this.animeRepository);
        this.seasonController = new SeasonController(this.seasonService);
        this.initRoutes();
    }

    private validatePayload() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('releaseDate').notEmpty().withMessage('Release date is required'),
            validatorMiddleware,
        ];
    }

    initRoutes() {
        this.router.get('/', rateLimitMiddleware, this.seasonController.get.bind(this));
        this.router.post('/', this.validatePayload(), this.seasonController.store.bind(this));
        this.router.delete('/:id', this.seasonController.delete.bind(this));
        this.router.patch('/:id', this.validatePayload(), this.seasonController.update.bind(this));
    }
}
