import { describe, it, expect } from 'vitest'
import deepMerge, { isObject } from '@/utilities/deepMerge'

describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('returns false for arrays and primitives', () => {
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('x')).toBe(false)
  })
})

describe('deepMerge', () => {
  it('merges nested objects', () => {
    const a = { x: { y: 1 }, z: 2 }
    const b = { x: { y: 2, w: 3 } }
    expect(deepMerge(a, b)).toEqual({ x: { y: 2, w: 3 }, z: 2 })
  })

  it('adds keys from source when missing on target', () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('assigns new object key when not present on target', () => {
    const a = { x: 1 }
    const b = { y: { z: 2 } }
    expect(deepMerge(a, b)).toEqual({ x: 1, y: { z: 2 } })
  })
})
