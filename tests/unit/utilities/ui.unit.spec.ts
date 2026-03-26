import { describe, it, expect } from 'vitest'
import { cn } from '@/utilities/ui'

describe('cn', () => {
  it('merges tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'block')).toBe('base block')
  })
})
