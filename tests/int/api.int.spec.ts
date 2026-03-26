import { getPayload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

const hasDatabase = Boolean(process.env.POSTGRES_URL?.trim())

describe.skipIf(!hasDatabase)('Payload integration', () => {
  let payload: Awaited<ReturnType<typeof getPayload>>

  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('boots Payload and can query with access enforced', async () => {
    const result = await payload.find({
      collection: 'pages',
      limit: 1,
      depth: 0,
      overrideAccess: false,
    })
    expect(result).toBeDefined()
    expect(Array.isArray(result.docs)).toBe(true)
  })
})

