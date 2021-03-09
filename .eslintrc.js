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
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
  env: {
    browser: true,
    commonjs: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: { '@typescript-eslint/explicit-module-boundary-types': 'off' },
    },
    {
      files: ['*.js'],
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
};
