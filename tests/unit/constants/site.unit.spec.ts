import { describe, it, expect } from 'vitest'
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

describe('site constants', () => {
  it('exports non-empty branding strings', () => {
    expect(SITE_NAME.length).toBeGreaterThan(0)
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(0)
  })
})
