import { defineConfig, devices } from '@playwright/test'

import { loadTestEnv } from './tests/helpers/loadTestEnv'

loadTestEnv()

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
const isCI = Boolean(process.env.CI)

// Set PLAYWRIGHT_WEB_SERVER_SILENCE=0 to see Next.js / Payload logs from the dev subprocess.
const silenceWebServer = process.env.PLAYWRIGHT_WEB_SERVER_SILENCE !== '0'

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  globalTeardown: './tests/e2e/global-teardown.ts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // One worker: Next dev + first Payload init per process are heavy; parallel tests cause ERR_ABORTED / flaky loads.
  workers: 1,
  fullyParallel: false,
  timeout: 120_000,
  // In CI: GitHub annotations + HTML report for artifact upload on failure.
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'html',
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
    // CI: production server after `pnpm build` (stable, closer to deploy). Local: dev server for HMR.
    command: isCI ? 'pnpm start' : 'pnpm dev',
    reuseExistingServer: !isCI,
    url: baseURL,
    timeout: 120_000,
    stdout: silenceWebServer ? 'ignore' : 'pipe',
    stderr: silenceWebServer ? 'ignore' : 'pipe',
  },
})
