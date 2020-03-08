module.exports = {
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
};
