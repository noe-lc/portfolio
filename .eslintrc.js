module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
  env: {
    browser: true,
    commonjs: true,
  },
};
