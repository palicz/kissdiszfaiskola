import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/utilities/getURL', () => ({
  getServerSideURL: () => 'https://example.com',
}))

describe('mergeOpenGraph', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('merges custom og with defaults and preserves provided images', async () => {
    const { mergeOpenGraph } = await import('@/utilities/mergeOpenGraph')
    const result = mergeOpenGraph({
      title: 'T',
      images: [{ url: 'https://cdn/img.png', width: 100, height: 100, alt: 'A' }],
    })
    expect(result?.images).toHaveLength(1)
    expect((result?.images as { url: string }[])[0]?.url).toBe('https://cdn/img.png')
    expect(result?.title).toBe('T')
  })

  it('uses default OG image when no images provided', async () => {
    const { mergeOpenGraph } = await import('@/utilities/mergeOpenGraph')
    const result = mergeOpenGraph({ title: 'Only' })
    expect(result?.images).toEqual([
      {
        url: 'https://example.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kiss Díszfaiskola',
      },
    ])
  })

  it('normalizes single image object to array', async () => {
    const { mergeOpenGraph } = await import('@/utilities/mergeOpenGraph')
    const result = mergeOpenGraph({
      images: { url: 'https://x/y.jpg', width: 1, height: 1, alt: 'x' },
    })
    expect(Array.isArray(result?.images)).toBe(true)
  })
})
