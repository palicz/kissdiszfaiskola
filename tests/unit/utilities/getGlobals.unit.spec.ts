import { describe, it, expect, vi, beforeEach } from 'vitest'

const findGlobalMock = vi.fn()

vi.mock('payload', () => ({
  getPayload: vi.fn(async () => ({
    findGlobal: findGlobalMock,
  })),
}))

vi.mock('@payload-config', () => ({
  default: Promise.resolve({}),
}))

vi.mock('next/cache', () => ({
  unstable_cache: (fn: () => Promise<unknown>) => fn,
}))

describe('getGlobals', () => {
  beforeEach(() => {
    vi.resetModules()
    findGlobalMock.mockReset()
  })

  it('getCachedGlobal loads global by slug', async () => {
    findGlobalMock.mockResolvedValue({ siteTitle: 'X' })
    const { getCachedGlobal } = await import('@/utilities/getGlobals')
    const g = await getCachedGlobal('header')()
    expect(findGlobalMock).toHaveBeenCalledWith({ slug: 'header', depth: 0 })
    expect(g).toEqual({ siteTitle: 'X' })
  })
})
