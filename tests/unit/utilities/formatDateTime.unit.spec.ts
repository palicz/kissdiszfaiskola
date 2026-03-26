import { describe, it, expect, vi, afterEach } from 'vitest'
import { formatDateTime, formatPostDateHu } from '@/utilities/formatDateTime'

describe('formatDateTime', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats a known timestamp as MM/DD/YYYY', () => {
    expect(formatDateTime('2024-03-15T12:00:00.000Z')).toMatch(/03\/\d{2}\/2024/)
  })

  it('uses current date when timestamp is empty', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-01T00:00:00.000Z'))
    expect(formatDateTime('')).toBe('06/01/2025')
  })
})

describe('formatPostDateHu', () => {
  it('formats Hungarian long date', () => {
    const s = formatPostDateHu('2024-01-15T00:00:00.000Z')
    expect(s).toMatch(/2024/)
  })
})
