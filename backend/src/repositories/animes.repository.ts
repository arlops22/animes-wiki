import { PrismaClient } from '../../generated/prisma/client.js';
import { IAnime, IAnimePayload, IAnimeFilter, IAnimesRepository, IAnimeList } from '../interfaces/anime.interface.js';

export class AnimesRepositoryPrisma implements IAnimesRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: IAnimePayload): Promise<IAnime> {
        return this.prisma.anime.create({
            data: payload,
        });
    }

    async findAll(filter: IAnimeFilter): Promise<IAnimeList> {
        const limit = Math.max(1, Number(filter.pageSize) || 20);
        const page = Math.max(1, Number(filter.page) || 1);
        const skip = (page - 1) * limit;

        const [animes, count] = await this.prisma.$transaction([
            this.prisma.anime.findMany({
                select: {
                    id: true,
                    name: true,
                    thumbnail: true,
                    createdAt: true,
                    updatedAt: true,
                    summary: true,
                    author: true,
                },
                skip,
                take: limit,
                where: {
                    name: {
                        contains: filter.name,
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.anime.count(),
        ]);

        const totalPages = Math.ceil(count / limit);

        return { count, totalPages, page, animes };
    }

    findById(id: number): Promise<IAnime | null> {
        return this.prisma.anime.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                thumbnail: true,
                createdAt: true,
                updatedAt: true,
                summary: true,
                author: true,
                characters: {
                    select: {
                        name: true,
                        description: true,
                        lifeStory: true,
                        photo: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                seasons: {
                    select: {
                        title: true,
                        releaseDate: true,
                        createdAt: true,
                        updatedAt: true,
                        episodes: {
                            select: {
                                title: true,
                                releaseDate: true,
                                synopsis: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
            },
        });
    }

    update(id: number, payload: IAnimePayload) {
        return this.prisma.anime.update({
            where: { id },
            data: payload,
        });
    }

    delete(id: number) {
        return this.prisma.anime.delete({
            where: { id },
        });
    }
}
