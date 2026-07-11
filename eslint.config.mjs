import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const reactCompilerHookRulesWarn = [
  'react-hooks/globals',
  'react-hooks/config',
  'react-hooks/gating',
  'react-hooks/error-boundaries',
  'react-hooks/purity',
  'react-hooks/immutability',
  'react-hooks/refs',
]

const reactCompilerHookRulesOff = [
  'react-hooks/static-components',
  'react-hooks/use-memo',
  'react-hooks/preserve-manual-memoization',
  'react-hooks/incompatible-library',
  'react-hooks/set-state-in-effect',
  'react-hooks/set-state-in-render',
]

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      ...Object.fromEntries(reactCompilerHookRulesWarn.map((rule) => [rule, 'warn'])),
      ...Object.fromEntries(reactCompilerHookRulesOff.map((rule) => [rule, 'off'])),
    },
  },
  globalIgnores(['.next/', 'coverage/', 'next-sitemap.config.cjs', 'src/migrations/**/*.ts']),
])
