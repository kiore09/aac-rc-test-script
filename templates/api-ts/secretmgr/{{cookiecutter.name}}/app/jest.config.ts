import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: './src',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/../coverage',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: './tsconfig.test.json' }
    ]
  }
}

export default config
