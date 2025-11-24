export default /** @type {import('ts-jest').JestConfigWithTsJest} */ {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.(js|ts)'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/utils/**/*.ts', '!**/*.test.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageThreshold: {
    global: { lines: 100, branches: 100, statements: 100, functions: 100 },
  },
};
