import { it, describe, expect } from '@jest/globals';
import request from 'supertest';

import { App } from '../../src/app';
import { IAnime, IAnimeList } from '../../src/interfaces/anime.interface';

describe('Animes', () => {
    const app = new App().app;
    let animeTest: IAnime;

    describe('POST /v1/animes', () => {
        it('should create an anime', async () => {
            const payload = {
                name: 'Anime Test',
            };
            const { status, body } = await request(app).post('/v1/animes').send(payload);
            animeTest = body;

            expect(status).toBe(201);
            expect(body).toEqual(expect.objectContaining(payload));
        });
    });

    describe('GET /v1/animes', () => {
        it('should return all animes', async () => {
            const animesList: IAnimeList = {
                animes: [animeTest],
                count: 1,
                page: 1,
                totalPages: 1,
            };
            const { status, body } = await request(app).get('/v1/animes');

            expect(status).toBe(200);
            expect(body).toStrictEqual(animesList);
        });
    });

    describe('GET /v1/animes/:id', () => {
        it('should return an specific anime', async () => {
            const { status, body } = await request(app).get(`/v1/animes/${animeTest.id}`);

            expect(status).toBe(200);
            expect(body).toStrictEqual({ ...animeTest, characters: [], seasons: [] });
        });
    });

    describe('PATCH /v1/animes/:id', () => {
        it('should update an anime', async () => {
            const payload = {
                name: 'Anime Test 2',
            };
            const { status, body } = await request(app).patch(`/v1/animes/${animeTest.id}`).send(payload);

            expect(status).toBe(200);
            expect(body).toEqual(expect.objectContaining(payload));
        });
    });

    describe('DELETE /v1/animes/:id', () => {
        it('should delete an anime', async () => {
            const { status } = await request(app).delete(`/v1/animes/${animeTest.id}`);

            expect(status).toBe(204);
        });
    });
});
