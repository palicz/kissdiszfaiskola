import { describe, it, expect } from 'vitest'
import {
  getSlideshowContainerAspect,
  getSlideshowObjectFit,
  mediaHasFocalPoint,
  SLIDESHOW_CONTAINER_ASPECT,
} from '@/utilities/slideshowSmartFit'

describe('slideshowSmartFit', () => {
  const baseMedia = { id: 1, width: 1600, height: 900 } as never

  it('exposes aspect constant', () => {
    expect(SLIDESHOW_CONTAINER_ASPECT).toBe(16 / 9)
    expect(getSlideshowContainerAspect()).toBe(16 / 9)
  })

  it('mediaHasFocalPoint detects focal numbers', () => {
    expect(mediaHasFocalPoint({ focalX: 1, focalY: 1 } as never)).toBe(true)
    expect(mediaHasFocalPoint({ focalX: 1 } as never)).toBe(false)
  })

  it('uses cover when focal is set', () => {
    expect(
      getSlideshowObjectFit(
        Object.assign({}, baseMedia, { focalX: 0.5, focalY: 0.5 }) as never,
        16 / 9,
      ),
    ).toBe('cover')
  })

  it('uses contain when image is taller than container', () => {
    expect(
      getSlideshowObjectFit(
        Object.assign({}, baseMedia, { width: 900, height: 2000 }) as never,
        16 / 9,
      ),
    ).toBe('contain')
  })

  it('uses cover when dimensions missing', () => {
    expect(getSlideshowObjectFit({ id: 1 } as never, 16 / 9)).toBe('cover')
  })

  it('uses cover when image is wider than container', () => {
    expect(
      getSlideshowObjectFit(
        Object.assign({}, baseMedia, { width: 3200, height: 900 }) as never,
        16 / 9,
      ),
    ).toBe('cover')
  })
})
