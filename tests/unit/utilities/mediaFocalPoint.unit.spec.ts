import { describe, it, expect } from 'vitest'
import { mediaObjectPositionFromResource } from '@/utilities/mediaFocalPoint'

describe('mediaObjectPositionFromResource', () => {
  it('returns undefined for invalid input', () => {
    expect(mediaObjectPositionFromResource(null)).toBeUndefined()
    expect(mediaObjectPositionFromResource(undefined)).toBeUndefined()
    expect(mediaObjectPositionFromResource('x' as never)).toBeUndefined()
  })

  it('returns undefined when focal coords missing', () => {
    expect(mediaObjectPositionFromResource({ id: 1 } as never)).toBeUndefined()
  })

  it('maps 0–1 and percent focal to CSS object-position', () => {
    expect(mediaObjectPositionFromResource({ focalX: 0.5, focalY: 0.25 } as never)).toBe('50% 25%')
    expect(mediaObjectPositionFromResource({ focalX: 30, focalY: 70 } as never)).toBe('30% 70%')
  })
})
