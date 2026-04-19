import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import eslintJs from '@eslint/js'
import tanstackPluginRouter from '@tanstack/eslint-plugin-router'
import eslintConfigPrettier from 'eslint-config-prettier'
import checkFile from 'eslint-plugin-check-file'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '**/routeTree.gen.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslintJs.configs.recommended,
      ...fixupConfigRules(tseslint.configs.recommended),
      ...fixupConfigRules(tseslint.configs.stylistic),
      reactHooks.configs.flat.recommended,
      sonarjs.configs.recommended,
      unicorn.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
      import: fixupPluginRules(importPlugin),
      promise: fixupPluginRules(promisePlugin),
      '@tanstack/router': tanstackPluginRouter,
    },
    rules: {
      // -- Existing rules --
      'no-console': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true, allowExportNames: ['Route'] },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'import/no-relative-parent-imports': 'warn',
      '@tanstack/router/create-route-property-order': 'error',

      'react-refresh/only-export-components': 'off',

      // -- Unicorn overrides (disable high-churn rules) --
      'unicorn/no-null': 'off', // React uses null extensively (JSX, state)
      'unicorn/prefer-global-this': 'off', // window is standard in browser code
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
          replacements: {
            props: false, // React convention (component props)
            prop: false, // React convention (single prop)
            ref: false, // React convention (useRef, forwardRef)
            args: false, // Common function arguments spread
            src: false, // HTML attribute convention (img src, etc.)
          },
        },
      ],

      // -- Promise rules --
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
    },
  },

  /**
   * File & Folder Naming Conventions
   * Enforces consistent kebab-case naming for all files and folders
   * Uses eslint-plugin-check-file for granular filename and folder name validation
   * Pages and routes directories are excluded — TanStack Router uses special naming (__root, _protected, $, etc.)
   */
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      /**
       * Filename Naming Convention
       * Enforces KEBAB_CASE for all TS/TSX filenames inside src/
       * With ignoreMiddleExtensions, only the base name is validated:
       * e.g. tenant.state.ts → validates "tenant", date-range.state.ts → validates "date-range"
       */
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/!(pages|routes)/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      /**
       * Folder Naming Convention
       * Enforces KEBAB_CASE for all folder names inside src/
       * Pages directory is excluded (TanStack Router uses _protected/, _auth/, etc.)
       */
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/!(pages)/**/': 'KEBAB_CASE',
        },
      ],
    },
  },

  /**
   * Per-Directory Filename Suffix Enforcement
   * Ensures files in each directory use the correct middle extension
   * e.g. queries/ → *.queries.ts, states/ → *.state.ts, hooks/ → use-*.ts
   * Overrides the general KEBAB_CASE rule for files in these directories
   */
  {
    files: [
      'src/queries/**/*.ts',
      'src/states/**/*.ts',
      'src/schemas/**/*.ts',
      'src/endpoints/**/*.ts',
      'src/utils/**/*.ts',
      'src/constants/**/*.ts',
      'src/services/**/*.ts',
      'src/http/**/*.ts',
      'src/hooks/**/*.{ts,tsx}',
      'src/types/**/*.ts',
      'src/components/**/*.tsx',
    ],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/queries/**/*.ts': '+([a-z0-9-]).queries',
          'src/states/**/*.ts': '+([a-z0-9-]).state',
          'src/schemas/**/*.ts': '+([a-z0-9-]).schema',
          'src/endpoints/**/*.ts': '+([a-z0-9-]).endpoints',
          'src/utils/**/*.ts': '+([a-z0-9-]).utils',
          'src/constants/**/*.ts': '+([a-z0-9-]).constants',
          'src/services/**/*.ts': '+([a-z0-9-]).service',
          'src/http/**/*.ts': '+([a-z0-9-]).http',
          'src/hooks/**/*.{ts,tsx}': 'use-+([a-z0-9-])',
          'src/types/**/*.ts': '+([a-z0-9-]).@(d|types)',
          'src/components/ui/**/*.tsx': '+([a-z0-9-])',
          'src/components/!(ui)/**/*.tsx': '+([a-z0-9-]).component',
        },
      ],
    },
  },
])
