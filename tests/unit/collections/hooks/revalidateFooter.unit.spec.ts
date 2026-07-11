import { describe, it, expect, vi } from 'vitest'
import { revalidateFooter } from '@/Footer/hooks/revalidateFooter'

const revalidateCacheTagMock = vi.fn()

vi.mock('@/utilities/revalidateCacheTag', () => ({
  revalidateCacheTag: (...args: unknown[]) => revalidateCacheTagMock(...args),
}))

describe('revalidateFooter', () => {
  it('revalidates when revalidation enabled', async () => {
    const doc = { id: 'f' }
    await revalidateFooter({
      doc,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidateCacheTagMock).toHaveBeenCalledWith('global_footer')
  })

  it('skips when disableRevalidate is set', async () => {
    revalidateCacheTagMock.mockClear()
    await revalidateFooter({
      doc: {},
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidateCacheTagMock).not.toHaveBeenCalled()
  })
})
