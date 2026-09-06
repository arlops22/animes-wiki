import { jest } from '@jest/globals';
import { mockDeep, mockReset } from 'jest-mock-extended';

import { PrismaClient } from '../../generated/prisma/client.js';

const prismaMock = mockDeep<PrismaClient>();

jest.mock('../database/prisma-client');

beforeEach(() => {
    mockReset(prismaMock);
});

export default prismaMock;
