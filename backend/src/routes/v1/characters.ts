import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../../database/prisma-client.js';
import { upload } from '../../config/multer.config.js';

import { IAnimesRepository } from '../../interfaces/anime.interface.js';
import { AnimesRepositoryPrisma } from '../../repositories/animes.repository.js';
import { ICharactersRepository } from '../../interfaces/character.interface.js';
import { CharacterService } from '../../services/character.service.js';
import { CharactersRepositoryPrisma } from '../../repositories/character.repository.js';
import { CharacterController } from '../../controllers/character.controller.js';
import { validatorMiddleware } from '../../middlewares/validator.middleware.js';
import { PowerRepositoryPrisma } from '../../repositories/power.repository.js';
import { IPowersRepository } from '../../interfaces/power.interface.js';
import { rateLimitMiddleware } from '../../middlewares/rate-limiter.middleware.js';

export class CharactersRoutes {
    public router: Router;
    private characterRepository: ICharactersRepository;
    private powerRepository: IPowersRepository;
    private animeRepository: IAnimesRepository;
    private characterService: CharacterService;
    private characterController: CharacterController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.characterRepository = new CharactersRepositoryPrisma(prisma);
        this.powerRepository = new PowerRepositoryPrisma(prisma);
        this.animeRepository = new AnimesRepositoryPrisma(prisma);
        this.characterService = new CharacterService(
            this.characterRepository,
            this.powerRepository,
            this.animeRepository,
        );
        this.characterController = new CharacterController(this.characterService);
        this.initRoutes();
    }

    private validatePayload() {
        return [body('name').notEmpty().withMessage('Name is required'), validatorMiddleware];
    }

    initRoutes() {
        this.router.post(
            '/',
            rateLimitMiddleware,
            upload.single('photo'),
            this.validatePayload(),
            this.characterController.store.bind(this.characterController),
        );
        this.router.get('/', this.characterController.get.bind(this.characterController));
        this.router.get('/:id', this.characterController.getById.bind(this.characterController));
        this.router.delete('/:id', this.characterController.delete.bind(this.characterController));
        this.router.patch(
            '/:id',
            upload.single('photo'),
            this.validatePayload(),
            this.characterController.update.bind(this.characterController),
        );
    }
}
