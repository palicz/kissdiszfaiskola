import { describe, it, expect, vi } from 'vitest'
import { revalidateHeader } from '@/Header/hooks/revalidateHeader'

const revalidateCacheTagMock = vi.fn()

vi.mock('@/utilities/revalidateCacheTag', () => ({
  revalidateCacheTag: (...args: unknown[]) => revalidateCacheTagMock(...args),
}))

describe('revalidateHeader', () => {
  it('revalidates when revalidation enabled', async () => {
    const doc = { id: 'h' }
    await revalidateHeader({
      doc,
      req: { payload: { logger: { info: vi.fn() } }, context: {} },
    } as never)
    expect(revalidateCacheTagMock).toHaveBeenCalledWith('global_header')
  })

  it('skips when disableRevalidate is set', async () => {
    revalidateCacheTagMock.mockClear()
    const doc = { id: 'h' }
    await revalidateHeader({
      doc,
      req: { payload: { logger: { info: vi.fn() } }, context: { disableRevalidate: true } },
    } as never)
    expect(revalidateCacheTagMock).not.toHaveBeenCalled()
  })
})
