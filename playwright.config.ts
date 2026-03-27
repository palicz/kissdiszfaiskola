import { defineConfig, devices } from '@playwright/test'

import { loadTestEnv } from './tests/helpers/loadTestEnv'

loadTestEnv()

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  globalTeardown: './tests/e2e/global-teardown.ts',
  forbidOnly: false,
  retries: 0,
  workers: 1,
  fullyParallel: false,
  timeout: 120_000,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    navigationTimeout: 60_000,
  },
  expect: {
    timeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: true,
    url: baseURL,
    timeout: 120_000,
  },
})
