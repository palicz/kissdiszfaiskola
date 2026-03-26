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

  it('prefixes relative paths with client base URL', async () => {
    const { getMediaUrl } = await import('@/utilities/getMediaUrl')
    expect(getMediaUrl('/media/x.png')).toBe('https://app.example/media/x.png')
    expect(getMediaUrl('/media/x.png', 'tag')).toBe('https://app.example/media/x.png?tag')
  })
})
