module.exports = {
    snapshotSerializers: [
      'enzyme-to-json/serializer'
    ],
    collectCoverageFrom: [
      'src/**/*.js',
      'src/**/*.tsx',
      '!src/__tests__/**/*',
      '!src/__e2e__/**/*',
      '!src/(App|index|serviceWorker|setupTests).js'
    ],
    coverageReporters: [
      'text',
      'lcov'
    ],
    moduleDirectories: ['node_modules'],
    transform: {
      '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest'
    },
    testPathIgnorePatterns: ['/lib/', '/node_modules/', '/src/model/api/**'],
    collectCoverage: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
  }
  