import { describe, it, expect, vi } from 'vitest'
import { revalidateHeader } from '@/Header/hooks/revalidateHeader'

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

describe('revalidateHeader', () => {
  it('revalidates when revalidation enabled', async () => {
    const { revalidateTag } = await import('next/cache')
    const doc = { id: 'h' }
    await revalidateHeader({
      doc,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidateTag).toHaveBeenCalledWith('global_header')
  })

  it('skips when disableRevalidate is set', async () => {
    const { revalidateTag } = await import('next/cache')
    vi.mocked(revalidateTag).mockClear()
    const doc = { id: 'h' }
    await revalidateHeader({
      doc,
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
