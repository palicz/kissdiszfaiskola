/**
 * CI only: apply Payload + Drizzle schema to an empty Postgres (dev push on first connect).
 * Same idea as tests/int/README.md and the integration job’s `NODE_ENV: test`.
 *
 * `pnpm build` runs `payload migrate` before Next starts; migrate needs core tables such as
 * `payload_folders` and `pages`, which the first `getPayload` creates when not production.
 *
 * Env must load before importing `payload.config` (it reads `PAYLOAD_SECRET` at module init).
 */
import { loadTestEnv } from '../tests/helpers/loadTestEnv'

loadTestEnv()
// NODE_ENV=test comes from `pnpm run` (see package.json) or CI env — required for Drizzle push.

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config.js')

await getPayload({ config })
process.exit(0)
