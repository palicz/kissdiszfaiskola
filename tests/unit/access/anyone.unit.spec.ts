import { describe, it, expect } from 'vitest'
import { anyone } from '@/access/anyone'

describe('anyone', () => {
  it('always returns true', () => {
    expect(anyone({} as Parameters<typeof anyone>[0])).toBe(true)
  })
})
