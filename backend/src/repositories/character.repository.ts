import { PrismaClient } from '../../generated/prisma/client.js';

import { ICharacterPayload, ICharactersRepository } from '../interfaces/character.interface.js';

export class CharactersRepositoryPrisma implements ICharactersRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: ICharacterPayload) {
        const { powers, ...characterPayload } = payload;

        return this.prisma.$transaction(async tx => {
            const character = await tx.character.create({
                data: characterPayload,
            });

            if (powers?.length > 0) {
                const powersForSave = powers.map(power => ({
                    characterId: character.id,
                    powerId: power.powerId,
                    level: power.level,
                }));
                await tx.characterPower.createMany({ data: powersForSave });
            }

            return tx.character.findUnique({
                where: { id: character.id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    lifeStory: true,
                    photo: true,
                    createdAt: true,
                    updatedAt: true,
                    powers: {
                        select: {
                            level: true,
                            power: {
                                select: {
                                    name: true,
                                    description: true,
                                    createdAt: true,
                                    updatedAt: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }

    findAll(animeId: number) {
        return this.prisma.character.findMany({
            where: {
                animeId,
            },
        });
    }

    findById(id: number) {
        return this.prisma.character.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                lifeStory: true,
                photo: true,
                createdAt: true,
                updatedAt: true,
                powers: {
                    select: {
                        level: true,
                        power: {
                            select: {
                                name: true,
                                description: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
            },
        });
    }

    update(id: number, payload: ICharacterPayload) {
        const { powers, ...characterPayload } = payload;

        return this.prisma.$transaction(async tx => {
            await tx.character.update({
                where: { id },
                data: characterPayload,
            });

            if (powers?.length > 0) {
                await tx.characterPower.deleteMany({ where: { characterId: Number(id) } });
                const powersForSave = powers.map(power => ({
                    characterId: id,
                    powerId: power.powerId,
                    level: power.level,
                }));
                await tx.characterPower.createMany({ data: powersForSave });
            }

            return tx.character.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    lifeStory: true,
                    photo: true,
                    createdAt: true,
                    updatedAt: true,
                    powers: {
                        select: {
                            level: true,
                            power: {
                                select: {
                                    name: true,
                                    description: true,
                                    createdAt: true,
                                    updatedAt: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }

    delete(id: number) {
        return this.prisma.character.delete({
            where: { id },
        });
    }
}
