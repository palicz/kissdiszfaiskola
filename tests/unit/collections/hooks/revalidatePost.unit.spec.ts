import { describe, it, expect, vi, beforeEach } from 'vitest'
import { revalidateDelete, revalidatePost } from '@/collections/Posts/hooks/revalidatePost'

const revalidatePathMock = vi.fn()
const revalidateTagMock = vi.fn()

vi.mock('next/cache', () => ({
  revalidatePath: (...args: unknown[]) => revalidatePathMock(...args),
  revalidateTag: (...args: unknown[]) => revalidateTagMock(...args),
}))

describe('revalidatePost hooks', () => {
  beforeEach(() => {
    revalidatePathMock.mockClear()
    revalidateTagMock.mockClear()
  })

  it('revalidates path for published post', async () => {
    const doc = { _status: 'published' as const, slug: 'hello' }
    await revalidatePost({
      doc,
      previousDoc: { _status: 'draft' as const, slug: 'hello' },
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/posts/hello')
    expect(revalidateTagMock).toHaveBeenCalledWith('posts-sitemap')
  })

  it('revalidates old slug when unpublishing', async () => {
    const doc = { _status: 'draft' as const, slug: 'x' }
    const previousDoc = { _status: 'published' as const, slug: 'old-slug' }
    await revalidatePost({
      doc,
      previousDoc,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/posts/old-slug')
  })

  it('skips when disableRevalidate is set', async () => {
    revalidatePathMock.mockClear()
    await revalidatePost({
      doc: { _status: 'published' as const, slug: 'x' },
      previousDoc: { _status: 'published' as const, slug: 'x' },
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidatePathMock).not.toHaveBeenCalled()
  })

  it('revalidateDelete removes post path', async () => {
    await revalidateDelete({
      doc: { slug: 'bye' },
      req: { context: {} },
    } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/posts/bye')
  })
})
