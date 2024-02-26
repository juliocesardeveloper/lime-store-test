module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.ts'],
  transformIgnorePatterns: [],
  
  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
      '\\.(css|less|scss)$': '<rootDir>/tests/mocks/styleMock.ts',
  },

  "preset": "ts-jest",
}