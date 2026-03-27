import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/**
 * Same resolution order as Next.js: `.env` then `.env.local` (override).
 * Used by Playwright config, global setup, and any Node helpers that call Payload.
 */
export function loadTestEnv(): void {
  loadEnv({ path: path.join(projectRoot, '.env'), quiet: true })
  loadEnv({ path: path.join(projectRoot, '.env.local'), override: true, quiet: true })
}
