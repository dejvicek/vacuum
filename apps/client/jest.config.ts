export default /** @type {import('ts-jest').JestConfigWithTsJest} */ {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.(js|ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          module: 'ESNext',
          target: 'ES2020',
          moduleResolution: 'node',
          types: ['jest', '@testing-library/jest-dom', 'node'],
        },
      },
    ],
  },
  collectCoverageFrom: [
    '<rootDir>/src/utils/**/*.ts',
    '<rootDir>/src/components/**/*.{ts,tsx}',
    '<rootDir>/src/contexts/**/*.{ts,tsx}',
    '<rootDir>/src/pages/**/*.{ts,tsx}',
    '<rootDir>/src/api/**/*.ts',
    '!**/*.test.{ts,tsx}',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageThreshold: {
    global: { lines: 80, branches: 80, statements: 80, functions: 80 },
  },
};
