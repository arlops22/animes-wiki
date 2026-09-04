import { Router } from 'express';

import { AnimeRoutes } from './animes.js';
import { EpisodeRoutes } from './episode.js';

export class V1Routes {
    public router: Router;
    private animeRoutes = new AnimeRoutes();
    private episodeRoutes = new EpisodeRoutes();

    constructor() {
        this.router = Router();
        this.router.use('/animes', this.animeRoutes.router);
        this.router.use('/seasons/:seasonId/episodes', this.episodeRoutes.router);
    }
}
