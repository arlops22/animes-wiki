import { PrismaClient } from '../../generated/prisma/client.js';

import { IPowerPayload, IPowersRepository } from '../interfaces/power.interface.js';

export class PowerRepositoryPrisma implements IPowersRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: IPowerPayload) {
        return this.prisma.power.create({ data: payload });
    }

    findAll(animeId: number) {
        return this.prisma.power.findMany({
            where: { animeId },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    findByIds(ids: number[]) {
        return this.prisma.power.findMany({
            where: { id: { in: ids } },
        });
    }

    update(id: number, payload: IPowerPayload) {
        return this.prisma.power.update({
            data: payload,
            where: { id },
        });
    }

    delete(id: number) {
        return this.prisma.power.delete({
            where: { id },
        });
    }
}
