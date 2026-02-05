import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'src/generated/**',
    'src/schema/generated/**',
    'src/schema/*.generated.ts',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
  },
  {
    files: ['src/schema/**/resolver.ts', 'src/schema/**/mutations.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
