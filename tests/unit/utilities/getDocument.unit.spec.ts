import { describe, it, expect, vi, beforeEach } from 'vitest'

const findMock = vi.fn()
const findByIDMock = vi.fn()

vi.mock('payload', () => ({
  getPayload: vi.fn(async () => ({
    find: findMock,
    findByID: findByIDMock,
  })),
}))

vi.mock('@payload-config', () => ({
  default: Promise.resolve({}),
}))

vi.mock('next/cache', () => ({
  unstable_cache: (fn: () => Promise<unknown>) => fn,
}))

describe('getDocument', () => {
  beforeEach(() => {
    vi.resetModules()
    findMock.mockReset()
    findByIDMock.mockReset()
  })

  it('getCachedDocument invokes find with slug and overrideAccess false', async () => {
    findMock.mockResolvedValue({ docs: [{ id: '1' }] })
    const { getCachedDocument } = await import('@/utilities/getDocument')
    const doc = await getCachedDocument('pages', 'home')()
    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'pages',
        overrideAccess: false,
        where: { slug: { equals: 'home' } },
      }),
    )
    expect(doc).toEqual({ id: '1' })
  })

  it('getCachedDocumentById invokes findByID with overrideAccess false', async () => {
    findByIDMock.mockResolvedValue({ id: 'x' })
    const { getCachedDocumentById } = await import('@/utilities/getDocument')
    const doc = await getCachedDocumentById('pages', 'x')()
    expect(findByIDMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'pages',
        id: 'x',
        overrideAccess: false,
      }),
    )
    expect(doc).toEqual({ id: 'x' })
  })
})
