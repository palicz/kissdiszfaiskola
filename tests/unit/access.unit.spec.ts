import { describe, it, expect } from 'vitest'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

function fakeArgs(user: unknown) {
  return { req: { user } } as Parameters<typeof authenticated>[0]
}

describe('authenticated', () => {
  it('returns true when a user is present', () => {
    expect(authenticated(fakeArgs({ id: '1', email: 'a@b.com' }))).toBe(true)
  })

  it('returns false when user is null', () => {
    expect(authenticated(fakeArgs(null))).toBe(false)
  })

  it('returns false when user is undefined', () => {
    expect(authenticated(fakeArgs(undefined))).toBe(false)
  })
})

describe('authenticatedOrPublished', () => {
  it('returns true for an authenticated user', () => {
    const result = authenticatedOrPublished(fakeArgs({ id: '1' }) as Parameters<typeof authenticatedOrPublished>[0])
    expect(result).toBe(true)
  })

  it('returns a published-only query constraint for anonymous visitors', () => {
    const result = authenticatedOrPublished(fakeArgs(null) as Parameters<typeof authenticatedOrPublished>[0])
    expect(result).toEqual({ _status: { equals: 'published' } })
  })
})
