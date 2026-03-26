import { describe, it, expect, vi } from 'vitest'
import { revalidateFooter } from '@/Footer/hooks/revalidateFooter'

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

describe('revalidateFooter', () => {
  it('revalidates when revalidation enabled', async () => {
    const { revalidateTag } = await import('next/cache')
    const doc = { id: 'f' }
    await revalidateFooter({
      doc,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidateTag).toHaveBeenCalledWith('global_footer')
  })

  it('skips when disableRevalidate is set', async () => {
    const { revalidateTag } = await import('next/cache')
    vi.mocked(revalidateTag).mockClear()
    await revalidateFooter({
      doc: {},
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
