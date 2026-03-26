import { describe, it, expect, vi, beforeEach } from 'vitest'

const findMock = vi.fn()

vi.mock('payload', () => ({
  getPayload: vi.fn(async () => ({
    find: findMock,
  })),
}))

vi.mock('@payload-config', () => ({
  default: Promise.resolve({}),
}))

vi.mock('next/cache', () => ({
  unstable_cache: (fn: () => Promise<unknown>) => fn,
}))

describe('getRedirects', () => {
  beforeEach(() => {
    vi.resetModules()
    findMock.mockReset()
  })

  it('fetches redirects collection with expected options', async () => {
    findMock.mockResolvedValue({ docs: [{ id: '1', from: '/a' }] })
    const { getRedirects } = await import('@/utilities/getRedirects')
    const docs = await getRedirects(2)
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'redirects',
        depth: 2,
        limit: 0,
        pagination: false,
      }),
    )
    expect(docs).toEqual([{ id: '1', from: '/a' }])
  })

  it('getCachedRedirects returns cached loader', async () => {
    findMock.mockResolvedValue({ docs: [] })
    const { getCachedRedirects } = await import('@/utilities/getRedirects')
    const docs = await getCachedRedirects()()
    expect(docs).toEqual([])
  })
})
