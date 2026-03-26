import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

describe('generatePreviewPath', () => {
  beforeEach(() => {
    vi.stubEnv('PREVIEW_SECRET', 'secret')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns null when slug is null or undefined', () => {
    expect(
      generatePreviewPath({
        collection: 'posts',
        slug: null as never,
        req: {} as never,
      }),
    ).toBeNull()
    expect(
      generatePreviewPath({
        collection: 'posts',
        slug: undefined as never,
        req: {} as never,
      }),
    ).toBeNull()
  })

  it('builds preview URL with encoded slug and collection', () => {
    const url = generatePreviewPath({
      collection: 'posts',
      slug: 'a b',
      req: {} as never,
    })
    expect(url).toContain('/next/preview?')
    expect(url).toContain('slug=')
    expect(url).toContain('collection=posts')
    expect(url).toContain('previewSecret=secret')
  })
})
