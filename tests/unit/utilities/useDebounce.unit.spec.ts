import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/utilities/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
      initialProps: { v: 'a' },
    })
    expect(result.current).toBe('a')
    rerender({ v: 'b' })
    expect(result.current).toBe('a')
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe('b')
  })
})
