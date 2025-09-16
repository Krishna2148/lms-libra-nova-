import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        // 👇 this lets ESLint accept @ts-nocheck without erroring
        allowReserved: true,
        comment: true,
      },
    },
    rules: {
      // allow @ts-nocheck, @ts-ignore, @ts-expect-error
      '@typescript-eslint/ban-ts-comment': 'off',
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
])
