module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/test'],
    testMatch: [
        '**/*.spec.ts',      // existing NestJS tests
        '**/*.test.ts'       // new schema tests
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    collectCoverageFrom: ['src/**/*.(t|j)s'],
    coverageDirectory: './coverage',
};