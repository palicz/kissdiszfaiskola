import { describe, it, expect } from 'vitest'
import { formatAuthors } from '@/utilities/formatAuthors'

describe('formatAuthors', () => {
  it('returns empty string when no names', () => {
    expect(formatAuthors([])).toBe('')
    expect(formatAuthors([{ id: 1, name: null }] as never)).toBe('')
  })

  it('formats one, two, and many authors', () => {
    expect(formatAuthors([{ id: 1, name: 'A' }] as never)).toBe('A')
    expect(
      formatAuthors([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ] as never),
    ).toBe('A and B')
    expect(
      formatAuthors([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
      ] as never),
    ).toBe('A, B and C')
  })
})
