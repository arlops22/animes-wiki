import { Router } from 'express';
import { prisma } from '../../database/prisma-client.js';

import { IAnimesRepository } from '../../interfaces/anime.interface.js';
import { AnimesRepositoryPrisma } from '../../repositories/animes.repository.js';
import { PowerService } from '../../services/power.service.js';
import { PowerController } from '../../controllers/power.controller.js';
import { IPowersRepository } from '../../interfaces/power.interface.js';
import { PowerRepositoryPrisma } from '../../repositories/power.repository.js';
import { rateLimitMiddleware } from '../../middlewares/rate-limiter.middleware.js';

export class PowerRoutes {
    public router: Router;
    private animeRepository: IAnimesRepository;
    private powerRepository: IPowersRepository;
    private powerService: PowerService;
    private powerController: PowerController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.animeRepository = new AnimesRepositoryPrisma(prisma);
        this.powerRepository = new PowerRepositoryPrisma(prisma);
        this.powerService = new PowerService(this.powerRepository, this.animeRepository);
        this.powerController = new PowerController(this.powerService);

        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', rateLimitMiddleware, this.powerController.create.bind(this));
        this.router.get('/', this.powerController.list.bind(this));
        this.router.patch('/:id', this.powerController.update.bind(this));
        this.router.delete('/:id', this.powerController.delete.bind(this));
    }
}
