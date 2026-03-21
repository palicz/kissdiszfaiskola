/**
 * Blog lista / kártyák: a Payload `select: { meta: true }` NEM tölti be a `meta.image` relációt,
 * ezért a kép csak ID marad — a Media komponens nem tud URL-t építeni.
 * @see https://payloadcms.com/docs/queries/select
 */
export const postCardListSelect = {
  title: true,
  slug: true,
  categories: true,
  publishedAt: true,
  heroImage: true,
  meta: {
    title: true,
    description: true,
    image: true,
  },
} as const

/** meta.image és heroImage (media) kitöltéséhez */
export const POST_CARD_LIST_DEPTH = 2
