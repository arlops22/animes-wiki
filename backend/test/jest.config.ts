import type { Config } from 'jest';

import rootConfig from '../jest.config.ts';

export default {
    ...rootConfig,
    testEnvironment: 'node',
    displayName: 'integration-tests',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    testMatch: ['<rootDir>/**/*.test.ts'],
} satisfies Config;
