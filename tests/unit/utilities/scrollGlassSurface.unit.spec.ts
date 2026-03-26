import { describe, it, expect } from 'vitest'
import {
  SCROLL_GLASS_RANGE_PX,
  scrollGlassBlendT,
  scrollGlassSurfaceStyleFromBlend,
} from '@/utilities/scrollGlassSurface'

describe('scrollGlassSurface', () => {
  it('defines scroll range', () => {
    expect(SCROLL_GLASS_RANGE_PX).toBe(220)
  })

  it('clamps blendT to 0–1', () => {
    expect(scrollGlassBlendT(-10)).toBe(0)
    expect(scrollGlassBlendT(10_000)).toBe(1)
    expect(scrollGlassBlendT(110)).toBeCloseTo(Math.pow(0.5, 0.85))
  })

  it('returns backdrop none when blend is near zero', () => {
    const style = scrollGlassSurfaceStyleFromBlend(0)
    expect(style.backdropFilter).toBe('none')
  })

  it('applies blur when blend is high', () => {
    const style = scrollGlassSurfaceStyleFromBlend(1)
    expect(String(style.backdropFilter)).toContain('blur')
  })
})
