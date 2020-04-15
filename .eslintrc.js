module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/react',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'prettier',
    'react-hooks',
    'promise',
    'jest',
    'unicorn',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    // curly: 'error',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    // // '@typescript-eslint/indent': 'off',
    // // '@typescript-eslint/no-non-null-assertion': 'off',
    // // '@typescript-eslint/no-explicit-any': 'off',
    // // '@typescript-eslint/explicit-function-return-type': 'off',
    // // '@typescript-eslint/no-object-literal-type-assertion': 'off',
    // // 'react-hooks/rules-of-hooks': 'error',
    // // 'react-hooks/exhaustive-deps': 'error',
    // 'unicorn/filename-case': 'warn',
    // 'react/prop-types': 'warn',
    // 'import/prefer-default-export': 'off',
    // 'react/no-array-index-key': 'warn',
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
    'jest/globals': true,
    es6: true,
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
