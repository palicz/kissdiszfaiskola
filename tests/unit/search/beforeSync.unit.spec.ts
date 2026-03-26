import { describe, it, expect, vi, beforeEach } from 'vitest'
import { beforeSyncWithSearch } from '@/search/beforeSync'

describe('beforeSyncWithSearch', () => {
  const findByID = vi.fn()

  beforeEach(() => {
    findByID.mockReset()
  })

  it('maps slug and meta from original doc', async () => {
    const searchDoc = {
      doc: { relationTo: 'posts' },
      slug: 'ignored',
    } as never
    const originalDoc = {
      id: 1,
      slug: 'real',
      title: 'T',
      meta: { title: 'Meta', description: 'D' },
      categories: [],
    } as never

    const out = await beforeSyncWithSearch({
      req: { payload: { findByID } },
      originalDoc,
      searchDoc,
    } as never)

    expect(out.slug).toBe('real')
    expect(out.meta?.title).toBe('Meta')
    expect(out.categories).toEqual([])
  })

  it('resolves category ids via findByID', async () => {
    findByID.mockResolvedValue({ id: 9, title: 'Cat' })
    const searchDoc = { doc: { relationTo: 'posts' } } as never
    const originalDoc = {
      id: 1,
      slug: 's',
      title: 'T',
      meta: {},
      categories: [9],
    } as never

    const out = await beforeSyncWithSearch({
      req: { payload: { findByID } },
      originalDoc,
      searchDoc,
    } as never)

    expect(findByID).toHaveBeenCalled()
    expect(out.categories?.[0]).toMatchObject({
      relationTo: 'categories',
      categoryID: '9',
      title: 'Cat',
    })
  })

  it('skips falsy category entries', async () => {
    const searchDoc = { doc: { relationTo: 'posts' } } as never
    const originalDoc = {
      id: 1,
      slug: 's',
      title: 'T',
      meta: {},
      categories: [null, undefined, 0],
    } as never
    const out = await beforeSyncWithSearch({
      req: { payload: { findByID } },
      originalDoc,
      searchDoc,
    } as never)
    expect(out.categories).toEqual([])
  })

  it('logs when category id is not found', async () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    findByID.mockResolvedValue(null)
    const searchDoc = { doc: { relationTo: 'posts' } } as never
    const originalDoc = {
      id: 1,
      slug: 's',
      title: 'T',
      meta: {},
      categories: [99],
    } as never
    await beforeSyncWithSearch({
      req: { payload: { findByID } },
      originalDoc,
      searchDoc,
    } as never)
    expect(err).toHaveBeenCalled()
    err.mockRestore()
  })

  it('keeps object categories without fetch', async () => {
    const searchDoc = { doc: { relationTo: 'posts' } } as never
    const originalDoc = {
      id: 1,
      slug: 's',
      title: 'T',
      meta: {},
      categories: [{ id: 2, title: 'Direct' }],
    } as never

    const out = await beforeSyncWithSearch({
      req: { payload: { findByID } },
      originalDoc,
      searchDoc,
    } as never)

    expect(findByID).not.toHaveBeenCalled()
    expect(out.categories?.[0]).toMatchObject({
      categoryID: '2',
      title: 'Direct',
    })
  })
})
