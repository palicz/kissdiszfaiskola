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

  it('returns absolute URL unchanged except optional cache query', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('https://blob/x.png')).toBe('https://blob/x.png')
    expect(getMediaUrl('https://blob/x.png', 'v1')).toBe('https://blob/x.png?v1')
  })

  it('keeps root-relative paths for same-origin next/image', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('/media/x.png')).toBe('/media/x.png')
    expect(getMediaUrl('/api/media/file/x.webp', 'tag')).toBe('/api/media/file/x.webp?tag')
  })
})
