import { describe, it, expect } from 'vitest'
import { toKebabCase } from '@/utilities/toKebabCase'

describe('toKebabCase', () => {
  it('converts camelCase and spaces', () => {
    expect(toKebabCase('fooBar')).toBe('foo-bar')
    expect(toKebabCase('Foo Bar')).toBe('foo-bar')
  })

  it('handles empty string', () => {
    expect(toKebabCase('')).toBe('')
  })
})
