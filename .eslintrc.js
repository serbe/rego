module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jest', 'promise', 'unicorn'],
  rules: {
    curly: 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-object-literal-type-assertion': 'off',
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'error',
    'unicorn/filename-case': 'warn',
    'react/prop-types': 'warn',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'warn',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
};

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "plugin:jsx-a11y/recommended",
//     "prettier",
//     "plugin:array-func/recommended",
//     "plugin:sonarjs/recommended",
//     "plugin:promise/recommended"
//   ],
//   "plugins": [
//     "jsx-a11y",
//     "prettier",
//     "@getify/proper-arrows",
//     "sonarjs",
//     "promise"
//   ],
//   "rules": {
//     "prettier/prettier": "error",
//     "jsx-a11y/click-events-have-key-events": "off",
//     "jsx-a11y/no-static-element-interactions": "off",
//     "jsx-a11y/label-has-associated-control": "off"
//   }
// },
