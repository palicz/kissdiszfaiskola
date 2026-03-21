import type { Metadata } from 'next/types'

import { BlogPostsIndex } from '@/components/BlogPostsIndex'
import configPromise from '@payload-config'
import { POST_CARD_LIST_DEPTH, postCardListSelect } from '@/utilities/postCardQuery'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'

export const revalidate = 600

const POSTS_PER_PAGE = 12

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 2) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: POST_CARD_LIST_DEPTH,
    limit: POSTS_PER_PAGE,
    page: sanitizedPageNumber,
    overrideAccess: false,
    sort: '-publishedAt',
    select: postCardListSelect,
  })

  if (posts.totalPages && sanitizedPageNumber > posts.totalPages) notFound()
  if (posts.docs.length === 0) notFound()

  return (
    <BlogPostsIndex
      currentPage={posts.page ?? sanitizedPageNumber}
      limit={POSTS_PER_PAGE}
      posts={posts.docs}
      totalDocs={posts.totalDocs}
      totalPages={posts.totalPages ?? 1}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog — ${pageNumber}. oldal | Kiss Díszfaiskola`,
    description:
      'Hírek és kertészeti tanácsok a Kiss Díszfaiskolától — díszfák, növények és szakmai tippek Nagykállóról.',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)

  const pages: { pageNumber: string }[] = []

  for (let i = 2; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
