import dotenv from 'dotenv';
import { prisma } from './prisma-test-client.js';

dotenv.config({ path: '.env.test' });

const resetDB = async () => {
    await prisma.$transaction([
        prisma.anime.deleteMany(),
        prisma.character.deleteMany(),
        prisma.characterPower.deleteMany(),
        prisma.season.deleteMany(),
        prisma.episode.deleteMany(),
    ]);
};

afterAll(async () => {
    await resetDB();
    await prisma.$disconnect();
});
