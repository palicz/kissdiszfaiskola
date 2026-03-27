import path from 'path'
import { fileURLToPath } from 'url'
import { config as loadEnv } from 'dotenv'

import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

const root = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.resolve(root, '.env') })
loadEnv({ path: path.resolve(root, '.env.local'), override: true })

afterEach(() => {
  cleanup()
})
