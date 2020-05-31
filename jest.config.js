const config = require('@snowpack/app-scripts-react/jest.config.js')

module.exports = {
  ...config(),
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
