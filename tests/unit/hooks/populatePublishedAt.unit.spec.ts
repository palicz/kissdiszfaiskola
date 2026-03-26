import { describe, it, expect, vi, afterEach } from 'vitest'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'

describe('populatePublishedAt', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('sets publishedAt on create when req.data has no publishedAt', async () => {
    const now = new Date('2025-01-01T00:00:00.000Z')
    vi.useFakeTimers()
    vi.setSystemTime(now)
    const data = { title: 'T' }
    const result = await populatePublishedAt({
      data,
      operation: 'create',
      req: { data: { title: 'T' } },
    } as never)
    expect((result as { publishedAt?: Date }).publishedAt).toEqual(now)
  })

  it('returns data unchanged when req.data already has publishedAt', async () => {
    const data = { title: 'T' }
    const result = await populatePublishedAt({
      data,
      operation: 'create',
      req: { data: { publishedAt: new Date() } },
    } as never)
    expect(result).toBe(data)
  })

  it('returns data unchanged when req.data is missing', async () => {
    const data = { title: 'T' }
    const result = await populatePublishedAt({
      data,
      operation: 'create',
      req: {},
    } as never)
    expect(result).toBe(data)
  })
})
