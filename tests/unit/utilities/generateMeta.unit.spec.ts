import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/utilities/mergeOpenGraph', () => ({
  mergeOpenGraph: vi.fn((og) => ({ merged: true, ...og })),
}))

vi.mock('@/utilities/getURL', () => ({
  getServerSideURL: () => 'https://site.example',
}))

describe('generateMeta', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('builds metadata with title fallback to site name', async () => {
    const { generateMeta } = await import('@/utilities/generateMeta')
    const meta = await generateMeta({ doc: { slug: 'p', meta: {} } })
    expect(meta.title).toBe('Kiss Díszfaiskola')
    expect(meta.openGraph).toEqual(expect.objectContaining({ merged: true }))
  })

  it('uses meta title and image when present', async () => {
    const { generateMeta } = await import('@/utilities/generateMeta')
    const meta = await generateMeta({
      doc: {
        slug: 'post',
        meta: {
          title: ' Hello ',
          description: 'D',
          image: { url: '/u.png' } as never,
        },
      },
    })
    expect(meta.title).toBe('Hello')
    expect(meta.description).toBe('D')
  })
})
