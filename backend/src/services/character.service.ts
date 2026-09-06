import { IAnimesRepository } from '../interfaces/anime.interface.js';
import { ICharacterPayload, ICharactersRepository } from '../interfaces/character.interface.js';
import { IPowersRepository } from '../interfaces/power.interface.js';
import { HttpException } from '../interfaces/httpException.interface.js';

export class CharacterService {
    constructor(
        private characterRepository: ICharactersRepository,
        private powerRepository: IPowersRepository,
        private animeRepository: IAnimesRepository,
    ) {}

    async create(payload: ICharacterPayload) {
        const { animeId, powers } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        if (powers) {
            const powerIds = powers.map(power => power.powerId);

            const foundPowers = await this.powerRepository.findByIds(powerIds);
            if (foundPowers.length !== powerIds.length) {
                throw new HttpException(404, 'One or more powers not found');
            }

            const invalidPower = foundPowers.find(power => power.animeId !== Number(animeId));
            if (invalidPower) {
                throw new HttpException(400, `Power "${invalidPower.name}" does not belong to this anime`);
            }
        }

        const response = await this.characterRepository.create(payload);
        return response;
    }

    async listByAnimeId(animeId: number) {
        const response = await this.characterRepository.findAll(animeId);
        return response;
    }

    async getById(id: number) {
        const response = await this.characterRepository.findById(id);

        if (!response) {
            throw new HttpException(404, 'Character not found');
        }

        return response;
    }

    async update(id: number, payload: ICharacterPayload) {
        const { animeId, powers } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        if (powers) {
            const powerIds = powers.map(power => power.powerId);
            const foundPowers = await this.powerRepository.findByIds(powerIds);
            if (foundPowers.length !== powerIds.length) {
                throw new HttpException(404, 'One or more powers not found');
            }

            const invalidPower = foundPowers.find(power => power.animeId !== Number(animeId));
            if (invalidPower) {
                throw new HttpException(400, `Power "${invalidPower.name}" does not belong to this anime`);
            }
        }

        const response = await this.characterRepository.update(Number(id), payload);
        return response;
    }

    async delete(id: number) {
        const response = await this.characterRepository.delete(Number(id));
        return response;
    }
}
