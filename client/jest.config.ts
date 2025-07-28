module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
     '^.+\\.svg$': 'jest-transform-stub',
  },
 moduleNameMapper: {
  "\\.svg\\?react$": '<rootDir>/__mocks__/svgMock.tsx'
}

};
