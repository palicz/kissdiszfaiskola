import { describe, it, expect, vi } from 'vitest'
import { populateAuthors } from '@/collections/Posts/hooks/populateAuthors'

describe('populateAuthors', () => {
  it('returns doc unchanged when no authors', async () => {
    const doc = { title: 'T' }
    const out = await populateAuthors({ doc, req: {} } as never)
    expect(out).toBe(doc)
  })

  it('populates from numeric author ids', async () => {
    const findByID = vi.fn().mockResolvedValue({ id: 1, name: 'Ada' })
    const doc = { authors: [1] }
    const out = await populateAuthors({
      doc,
      req: { payload: { findByID } },
    } as never)
    expect(findByID).toHaveBeenCalled()
    expect(out?.populatedAuthors).toEqual([{ id: 1, name: 'Ada' }])
  })

  it('populates from embedded author objects', async () => {
    const findByID = vi.fn().mockResolvedValue({ id: 2, name: 'Bob' })
    const doc = { authors: [{ id: 2 }] }
    const out = await populateAuthors({
      doc,
      req: { payload: { findByID } },
    } as never)
    expect(out?.populatedAuthors).toEqual([{ id: 2, name: 'Bob' }])
  })

  it('swallows findByID errors', async () => {
    const findByID = vi.fn().mockRejectedValue(new Error('fail'))
    const doc = { authors: [9] }
    const out = await populateAuthors({
      doc,
      req: { payload: { findByID } },
    } as never)
    expect(out?.populatedAuthors).toBeUndefined()
  })
})
