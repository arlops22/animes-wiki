import { IAnimesRepository } from '../interfaces/anime.interface.js';
import { HttpException } from '../interfaces/httpException.interface.js';
import { ISeasonPayload, ISeasonsRepository } from '../interfaces/season.interface.js';

export class SeasonService {
    constructor(
        private seasonRepository: ISeasonsRepository,
        private animeRepository: IAnimesRepository,
    ) {}

    async create(payload: ISeasonPayload) {
        const { animeId } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        const response = await this.seasonRepository.create(payload);
        return response;
    }

    async listByAnimeId(animeId: number) {
        const response = await this.seasonRepository.findAll(animeId);
        return response;
    }

    async update(id: number, payload: ISeasonPayload) {
        const { animeId } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        const response = await this.seasonRepository.update(Number(id), payload);
        return response;
    }

    async delete(id: number) {
        const response = await this.seasonRepository.delete(Number(id));
        return response;
    }
}
