import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const root = path.dirname(fileURLToPath(import.meta.url))

const coverageInclude = [
  'src/utilities/**/*.{ts,tsx}',
  'src/access/**/*.ts',
  'src/hooks/**/*.ts',
  'src/constants/**/*.ts',
  'src/Header/hooks/**/*.ts',
  'src/Footer/hooks/**/*.ts',
  'src/search/beforeSync.ts',
  'src/collections/**/hooks/**/*.ts',
]

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      react: path.resolve(root, 'node_modules/react'),
      'react-dom': path.resolve(root, 'node_modules/react-dom'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'tests/unit/**/*.unit.spec.ts',
      'tests/unit/**/*.unit.spec.tsx',
      'tests/int/**/*.int.spec.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: coverageInclude,
      exclude: [
        '**/node_modules/**',
        '**/payload-types.ts',
        '**/migrations/**',
        '**/importMap.js',
        '**/.next/**',
        '**/tests/**',
        '**/utilities/canUseDOM.ts',
      ],
      thresholds: {
        lines: 95,
        statements: 95,
        branches: 88,
        functions: 95,
      },
    },
  },
})
