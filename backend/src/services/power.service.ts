import { IAnimesRepository } from '../interfaces/anime.interface.js';
import { HttpException } from '../interfaces/httpException.interface.js';
import { IPowerPayload, IPowersRepository } from '../interfaces/power.interface.js';

export class PowerService {
    constructor(
        private powerRepository: IPowersRepository,
        private animeRepository: IAnimesRepository,
    ) {}

    async create(payload: IPowerPayload) {
        const { animeId } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) throw new HttpException(404, 'Anime not found');

        const response = await this.powerRepository.create(payload);
        return response;
    }

    listByAnimeId(animeId: number) {
        return this.powerRepository.findAll(animeId);
    }

    async update(id: number, payload: IPowerPayload) {
        const { animeId } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) throw new HttpException(404, 'Anime not found');

        const response = await this.powerRepository.update(id, payload);
        return response;
    }

    delete(id: number) {
        return this.powerRepository.delete(id);
    }
}
