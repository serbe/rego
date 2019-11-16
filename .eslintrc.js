module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    'plugin:array-func/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'prettier', 'jsx-a11y', 'sonarjs'],
  rules: {
    curly: 'error',
    'prettier/prettier': 'error',
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
    'sonarjs/cognitive-complexity': 'warn',
    'react/prop-types': 'warn',
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.9',
    },
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
