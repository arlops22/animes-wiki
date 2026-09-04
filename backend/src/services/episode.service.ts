import { ISeasonsRepository } from '../interfaces/season.interface.js';
import { IEpisodePayload, IEpisodesRepository } from '../interfaces/episode.interface.js';
import { HttpException } from '../interfaces/httpException.interface.js';

export class EpisodeService {
    constructor(
        private episodeRepository: IEpisodesRepository,
        private seasonRepository: ISeasonsRepository,
    ) {}

    async create(payload: IEpisodePayload) {
        const { seasonId } = payload;

        const season = await this.seasonRepository.findById(seasonId);
        if (!season) {
            throw new HttpException(404, 'Season not found');
        }

        const response = await this.episodeRepository.create(payload);
        return response;
    }

    async update(id: number, payload: IEpisodePayload) {
        const { seasonId } = payload;

        const season = await this.seasonRepository.findById(seasonId);
        if (!season) {
            throw new HttpException(404, 'Season not found');
        }

        const response = await this.episodeRepository.update(Number(id), payload);
        return response;
    }

    async delete(id: number) {
        const response = await this.episodeRepository.delete(Number(id));
        return response;
    }
}
