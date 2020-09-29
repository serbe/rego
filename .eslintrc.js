module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'jsx-a11y/label-has-associated-control': 'warn',
    'import/prefer-default-export': 'warn',
    'react/no-array-index-key': 'warn',
    'import/no-cycle': 'warn',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
};
