import { describe, it, expect, vi, beforeEach } from 'vitest'
import { revalidateCacheTag } from '@/utilities/revalidateCacheTag'

const revalidateTagMock = vi.fn()

vi.mock('next/cache', () => ({
  revalidateTag: (...args: unknown[]) => revalidateTagMock(...args),
}))

describe('revalidateCacheTag', () => {
  beforeEach(() => {
    revalidateTagMock.mockClear()
  })

  it('calls revalidateTag with expire 0', () => {
    revalidateCacheTag('pages-sitemap')
    expect(revalidateTagMock).toHaveBeenCalledWith('pages-sitemap', { expire: 0 })
  })
})
