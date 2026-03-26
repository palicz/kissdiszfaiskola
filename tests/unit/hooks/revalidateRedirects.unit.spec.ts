import { describe, it, expect, vi } from 'vitest'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

describe('revalidateRedirects', () => {
  it('revalidates redirects tag', async () => {
    const { revalidateTag } = await import('next/cache')
    const info = vi.fn()
    const doc = { id: '1' }
    const result = await revalidateRedirects({
      doc,
      req: { payload: { logger: { info } } },
    } as never)
    expect(revalidateTag).toHaveBeenCalledWith('redirects')
    expect(result).toBe(doc)
  })
})
