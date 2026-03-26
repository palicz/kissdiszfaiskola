import { describe, it, expect } from 'vitest'
import { POST_CARD_LIST_DEPTH, postCardListSelect } from '@/utilities/postCardQuery'

describe('postCardQuery', () => {
  it('exports depth constant', () => {
    expect(POST_CARD_LIST_DEPTH).toBe(2)
  })

  it('includes meta.image in select shape', () => {
    expect(postCardListSelect.meta).toEqual(
      expect.objectContaining({
        image: true,
      }),
    )
  })
})
