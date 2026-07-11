import { describe, it, expect, vi, beforeEach } from 'vitest'
import { revalidateDelete, revalidatePage } from '@/collections/Pages/hooks/revalidatePage'

const revalidatePathMock = vi.fn()
const revalidateCacheTagMock = vi.fn()

vi.mock('next/cache', () => ({
  revalidatePath: (...args: unknown[]) => revalidatePathMock(...args),
}))

vi.mock('@/utilities/revalidateCacheTag', () => ({
  revalidateCacheTag: (...args: unknown[]) => revalidateCacheTagMock(...args),
}))

describe('revalidatePage hooks', () => {
  beforeEach(() => {
    revalidatePathMock.mockClear()
    revalidateCacheTagMock.mockClear()
  })

  it('revalidates path for published page', async () => {
    const doc = { _status: 'published' as const, slug: 'about' }
    await revalidatePage({
      doc,
      previousDoc: undefined,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/about')
    expect(revalidateCacheTagMock).toHaveBeenCalledWith('pages-sitemap')
  })

  it('uses root path for home slug', async () => {
    const doc = { _status: 'published' as const, slug: 'home' }
    await revalidatePage({
      doc,
      previousDoc: undefined,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/')
  })

  it('revalidates old path when unpublishing', async () => {
    const doc = { _status: 'draft' as const, slug: 'new' }
    const previousDoc = { _status: 'published' as const, slug: 'old' }
    await revalidatePage({
      doc,
      previousDoc,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/old')
  })

  it('skips when disableRevalidate is set', async () => {
    await revalidatePage({
      doc: { _status: 'published' as const, slug: 'x' },
      previousDoc: undefined,
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidatePathMock).not.toHaveBeenCalled()
    expect(revalidateCacheTagMock).not.toHaveBeenCalled()
  })

  it('revalidateDelete removes path', async () => {
    await revalidateDelete({
      doc: { slug: 'gone' },
      req: { context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/gone')
  })
})
