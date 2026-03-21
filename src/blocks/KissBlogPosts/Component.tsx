import type { KissBlogPostsBlock as KissBlogPostsBlockFields } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import type { KissPostCardData } from '@/components/KissPostCard'
import { KissBlogArchive } from '@/components/KissBlogArchive'
import { POST_CARD_LIST_DEPTH, postCardListSelect } from '@/utilities/postCardQuery'

export const KissBlogPostsBlock: React.FC<
  KissBlogPostsBlockFields & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    eyebrow,
    heading,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props

  const limit = limitFromProps ?? 6

  let posts: KissPostCardData[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: POST_CARD_LIST_DEPTH,
      limit,
      overrideAccess: false,
      sort: '-publishedAt',
      select: postCardListSelect,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs as KissPostCardData[]
  } else if (selectedDocs?.length) {
    const filteredSelectedPosts = selectedDocs
      .map((rel) => {
        if (typeof rel === 'object' && rel !== null && 'value' in rel) {
          const v = rel.value
          if (typeof v === 'object' && v !== null) return v
        }
        return null
      })
      .filter(Boolean)

    posts = filteredSelectedPosts as KissPostCardData[]
  }

  return (
    <section
      className="bg-b-surface-container-low px-4 py-16 md:px-6 md:py-24 lg:px-8"
      id={id ? `block-${id}` : undefined}
    >
      <div className="container">
        <header className="mb-12 max-w-3xl md:mb-16 md:ms-0 md:me-auto md:pe-4 lg:mb-20">
          {eyebrow ? (
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-b-on-surface-variant">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="font-headline text-3xl leading-tight text-b-primary editorial-spacing md:text-4xl lg:text-[2.75rem]">
              {heading}
            </h2>
          ) : null}
          {introContent ? (
            <div className="mt-6 md:mt-8">
              <RichText
                className="prose prose-neutral max-w-none font-sans text-b-on-surface-variant prose-headings:font-headline prose-headings:text-b-primary prose-p:leading-relaxed md:prose-lg"
                data={introContent}
                enableGutter={false}
              />
            </div>
          ) : null}
        </header>

        <KissBlogArchive posts={posts} />
      </div>
    </section>
  )
}
