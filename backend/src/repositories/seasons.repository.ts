import { PrismaClient } from '../../generated/prisma/client.js';
import { ISeason, ISeasonPayload, ISeasonsRepository } from '../interfaces/season.interface.js';

export class SeasonsRepositoryPrisma implements ISeasonsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: ISeasonPayload): Promise<ISeason> {
        return this.prisma.season.create({
            data: payload,
        });
    }

    findAll(animeId: number): Promise<ISeason[]> {
        return this.prisma.season.findMany({
            where: {
                animeId,
            },
            include: {
                episodes: true,
            },
        });
    }

    findById(id: number): Promise<ISeason | null> {
        return this.prisma.season.findUnique({
            where: { id },
        });
    }

    update(id: number, payload: ISeasonPayload) {
        return this.prisma.season.update({
            where: { id },
            data: payload,
        });
    }

    delete(id: number) {
        return this.prisma.season.delete({
            where: { id },
        });
    }
}
