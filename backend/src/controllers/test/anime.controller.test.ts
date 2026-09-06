import { NextFunction, Request, Response } from 'express';
import { it, describe, expect, jest, beforeEach } from '@jest/globals';
import { mockDeep, mockReset } from 'jest-mock-extended';

import AnimeController from '../anime.controller';
import AnimesRepositoryPrisma from '../../repositories/animes.repository';
import { Anime, AnimeList, AnimePayload } from '../../interfaces/anime.interface';

const mockAnime: Anime = {
    id: 1,
    name: 'Anime Test',
    summary: null,
    author: null,
    thumbnail: 'dir/test/anime-thumb.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
};

jest.mock('../../repositories/animes.repository');

describe('Anime Controller', () => {
    let req: Partial<Request>, res: Partial<Response>, next: NextFunction;
    const animeRepositoryMock = mockDeep<AnimesRepositoryPrisma>();
    const animeController = new AnimeController(animeRepositoryMock);

    beforeEach(() => {
        req = { body: {}, params: {}, file: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>;
        next = jest.fn();
        mockReset(animeRepositoryMock);
    });

    describe('Store animes endpoint', () => {
        it('should create an anime', async () => {
            const mockAnimePayload: AnimePayload = {
                name: 'Anime Test',
            };
            req.body = mockAnimePayload;
            req.file = {
                destination: 'dir/test/anime-thumb.jpeg',
            };

            animeRepositoryMock.create.mockResolvedValue(mockAnime);

            await animeController.store(req as Request, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAnime);
        });
    });

    describe('Get animes endpoint', () => {
        it('should return all animes', async () => {
            const resolvedFindAll: AnimeList = {
                animes: [mockAnime],
                page: 1,
                totalPages: 1,
                count: 1,
            };
            animeRepositoryMock.findAll.mockResolvedValue(resolvedFindAll);

            await animeController.get(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(resolvedFindAll);
        });
    });

    describe('Get anime by id endpoint', () => {
        it('should return a single anime', async () => {
            req = { params: { id: '1' } };

            animeRepositoryMock.findById.mockResolvedValue(mockAnime);

            await animeController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAnime);
        });

        it('should throw 404 error if anime not found', async () => {
            req = { params: { id: '99' } };

            animeRepositoryMock.findById.mockResolvedValue(null);

            expect(animeController.getById(req as Request, res as Response)).rejects.toThrow('Anime not found');
            expect(animeController.getById(req as Request, res as Response)).rejects.toHaveProperty('status', 404);
        });
    });

    describe('Update animes endpoint', () => {
        it('should update an anime', async () => {
            req = { params: { id: '1' } };

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
            req.body = mockAnimePayload;
            req.file = {
                destination: 'dir/test/anime-thumb.jpeg',
            };

            animeRepositoryMock.update.mockResolvedValue(updatedMockAnime);

            await animeController.update(req as Request, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedMockAnime);
        });
    });

    describe('Delete animes endpoint', () => {
        it('should delete an anime', async () => {
            req = { params: { id: '1' } };

            animeRepositoryMock.delete.mockResolvedValue(mockAnime);

            await animeController.delete(req as Request, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAnime);
        });
    });
});
