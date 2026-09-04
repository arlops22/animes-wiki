import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({});

export default {
    ...presetConfig,
    testEnvironment: 'node',
    displayName: 'unit-tests',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testTimeout: 30000,
    coveragePathIgnorePatterns: ['<rootDir>/generated/'],
} satisfies Config;
