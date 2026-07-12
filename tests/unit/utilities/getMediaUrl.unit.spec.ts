import { describe, it, expect, vi } from 'vitest'

vi.mock('@/utilities/getURL', () => ({
  getClientSideURL: () => 'https://app.example',
}))

describe('getMediaUrl', () => {
  it('returns empty string for falsy url', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl(null)).toBe('')
    expect(getMediaUrl(undefined)).toBe('')
    expect(getMediaUrl('')).toBe('')
  })

  it('returns blob URLs unchanged except optional v= cache query', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('https://abc.public.blob.vercel-storage.com/x.png')).toBe(
      'https://abc.public.blob.vercel-storage.com/x.png',
    )
    expect(getMediaUrl('https://abc.public.blob.vercel-storage.com/x.png', 'v1')).toBe(
      'https://abc.public.blob.vercel-storage.com/x.png?v=v1',
    )
  })

  it('normalizes absolute Payload API URLs to relative paths', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(
      getMediaUrl(
        'https://old-preview.vercel.app/api/media/file/img1.webp?2026-03-24T20%3A47%3A26.293Z',
      ),
    ).toBe('/api/media/file/img1.webp')
    expect(
      getMediaUrl(
        'https://old-preview.vercel.app/api/media/file/img1.webp',
        '2026-03-24T20:47:26.293Z',
      ),
    ).toBe('/api/media/file/img1.webp?v=2026-03-24T20%3A47%3A26.293Z')
  })

  it('keeps root-relative Payload paths for same-origin next/image', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('/api/media/file/x.webp')).toBe('/api/media/file/x.webp')
    expect(getMediaUrl('/api/media/file/x.webp', 'tag')).toBe('/api/media/file/x.webp?v=tag')
  })

  it('prefixes bare paths with client base URL', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('media/x.png')).toBe('https://app.example/media/x.png')
  })

  it('returns other absolute URLs unchanged', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('https://cdn.example.com/photo.jpg', '1')).toBe(
      'https://cdn.example.com/photo.jpg?v=1',
    )
  })
})
