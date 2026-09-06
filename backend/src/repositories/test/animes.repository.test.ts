import { it, describe, expect } from '@jest/globals';

import prismaMock from '../../__mocks__/prisma-client.mock';
import AnimesRepositoryPrisma from '../animes.repository';
import { Anime, AnimePayload } from '../../interfaces/anime.interface';

describe('Animes Repository', () => {
    const animesRepository = new AnimesRepositoryPrisma(prismaMock);
    const mockAnime: Anime = {
        id: 1,
        name: 'Anime Test',
        summary: null,
        author: null,
        thumbnail: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('Method create', () => {
        it('should create an anime', async () => {
            const mockAnimePayload: AnimePayload = {
                name: 'Anime Test',
            };

            prismaMock.anime.create.mockResolvedValue(mockAnime);

            const anime = await animesRepository.create(mockAnimePayload);
            expect(anime).toStrictEqual(mockAnime);
            expect(prismaMock.anime.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('Method findAll', () => {
        it('should return all animes', async () => {
            prismaMock.$transaction.mockResolvedValue([[mockAnime], 1]);

            const { animes, page, count, totalPages } = await animesRepository.findAll({
                name: '',
                page: 1,
                pageSize: 10,
            });

            expect(animes).toStrictEqual([mockAnime]);
            expect(page).toBe(1);
            expect(count).toBe(1);
            expect(totalPages).toBe(1);
            expect(prismaMock.anime.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('Method findById', () => {
        it('should return a single anime', async () => {
            prismaMock.anime.findUnique.mockResolvedValue(mockAnime);

            const anime = await animesRepository.findById(1);

            expect(anime).toStrictEqual(mockAnime);
            expect(prismaMock.anime.findUnique).toHaveBeenCalledTimes(1);
        });
    });

    describe('Method update', () => {
        it('should update an anime', async () => {
            const mockAnimePayload: AnimePayload = {
                name: 'Anime Test',
                author: 'Author test',
                summary: 'This is a test summary',
            };

            const updatedMockAnime = {
                ...mockAnime,
                author: 'Author test',
                summary: 'This is a test summary',
            };

            prismaMock.anime.update.mockResolvedValue(updatedMockAnime);

            const anime = await animesRepository.update(1, mockAnimePayload);
            expect(anime).toStrictEqual(updatedMockAnime);
            expect(prismaMock.anime.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: mockAnimePayload,
            });
        });
    });

    describe('Method delete', () => {
        it('should delete an anime', async () => {
            prismaMock.anime.delete.mockResolvedValue(mockAnime);
            const anime = await animesRepository.delete(1);

            expect(anime).toStrictEqual(mockAnime);
            expect(prismaMock.anime.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
        });
    });
});
