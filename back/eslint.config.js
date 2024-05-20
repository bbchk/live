import globals from 'globals'
import prettier from 'eslint-plugin-prettier'

import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{mjs,cjs,js}'],
    languageOptions: {
      globals: {
        ...globals.node, // Node.js global variables
        ...globals.es2017, // ES6 global variables
        ...globals.jest, // Jest global variables
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettier,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      semi: 'off',
      indent: 'off',
      'no-console': 1,
      'no-unused-vars': [1, { argsIgnorePattern: 'res|next|req|err' }],
      'linebreak-style': [2, 'unix'],
      quotes: [2, 'single', { avoidEscape: true }],
      'prettier/prettier': 2,
    },
  },
]
