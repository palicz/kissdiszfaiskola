import { describe, it, expect, vi } from 'vitest'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'

const revalidateCacheTagMock = vi.fn()

vi.mock('@/utilities/revalidateCacheTag', () => ({
  revalidateCacheTag: (...args: unknown[]) => revalidateCacheTagMock(...args),
}))

describe('revalidateRedirects', () => {
  it('revalidates redirects tag', async () => {
    const info = vi.fn()
    const doc = { id: '1' }
    const result = await revalidateRedirects({
      doc,
      req: { payload: { logger: { info } }, context: {} },
    } as never)
    expect(revalidateCacheTagMock).toHaveBeenCalledWith('redirects')
    expect(result).toBe(doc)
  })

  it('skips when disableRevalidate is set', async () => {
    revalidateCacheTagMock.mockClear()
    await revalidateRedirects({
      doc: { id: '1' },
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidateCacheTagMock).not.toHaveBeenCalled()
  })
})
