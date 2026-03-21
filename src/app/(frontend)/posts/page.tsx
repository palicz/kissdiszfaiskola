import type { Metadata } from 'next/types'

import { BlogPostsIndex } from '@/components/BlogPostsIndex'
import configPromise from '@payload-config'
import { POST_CARD_LIST_DEPTH, postCardListSelect } from '@/utilities/postCardQuery'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

const POSTS_PER_PAGE = 12

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: POST_CARD_LIST_DEPTH,
    limit: POSTS_PER_PAGE,
    overrideAccess: false,
    sort: '-publishedAt',
    select: postCardListSelect,
  })

  return (
    <BlogPostsIndex
      currentPage={posts.page ?? 1}
      limit={POSTS_PER_PAGE}
      posts={posts.docs}
      totalDocs={posts.totalDocs}
      totalPages={posts.totalPages ?? 1}
    />
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Kiss Díszfaiskola',
    description:
      'Hírek és kertészeti tanácsok a Kiss Díszfaiskolától — díszfák, növények és szakmai tippek Nagykállóról.',
  }
}
