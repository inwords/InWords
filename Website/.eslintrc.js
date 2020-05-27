const path = require('path');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
    // 'import/no-unused-modules': [1, { unusedExports: true }]
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
