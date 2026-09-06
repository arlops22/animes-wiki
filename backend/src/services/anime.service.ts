import { IAnime, IAnimeFilter, IAnimeList, IAnimePayload, IAnimesRepository } from '../interfaces/anime.interface.js';
import { HttpException } from '../interfaces/httpException.interface.js';

export class AnimeService {
    constructor(private service: IAnimesRepository) {}

    async create(payload: IAnimePayload): Promise<IAnime> {
        const response = await this.service.create(payload);
        return response;
    }

    async list(filter: IAnimeFilter): Promise<IAnimeList> {
        const response = await this.service.findAll(filter);
        return response;
    }

    async getById(id: number) {
        const response = await this.service.findById(id);

        if (!response) {
            throw new HttpException(404, 'Anime not found');
        }

        return response;
    }

    async update(id: number, payload: IAnimePayload) {
        const anime = await this.service.findById(id);

        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        const response = await this.service.update(id, payload);
        return response;
    }

    async delete(id: number) {
        const anime = await this.service.findById(id);

        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        const response = await this.service.delete(Number(id));
        return response;
    }
}
