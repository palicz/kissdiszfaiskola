import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Load .env files for tests that need env (e.g. integration)
import 'dotenv/config'

afterEach(() => {
  cleanup()
})
