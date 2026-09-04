import { PrismaClient } from '../../generated/prisma/client.js';
import { IEpisode, IEpisodePayload, IEpisodesRepository } from '../interfaces/episode.interface.js';

export class EpisodesRepositoryPrisma implements IEpisodesRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: IEpisodePayload): Promise<IEpisode> {
        return this.prisma.episode.create({
            data: payload,
        });
    }

    update(id: number, payload: IEpisodePayload) {
        return this.prisma.episode.update({
            where: { id },
            data: payload,
        });
    }

    delete(id: number) {
        return this.prisma.episode.delete({
            where: { id },
        });
    }
}
