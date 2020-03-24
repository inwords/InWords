const path = require('path');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, 'webpack.common.js')
      }
    },
    react: {
      version: 'detect'
    }
  }
};
