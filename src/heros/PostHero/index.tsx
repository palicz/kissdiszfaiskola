import { formatPostDateHu } from '@/utilities/formatDateTime'
import React, { Suspense } from 'react'

import type { Post } from '@/payload-types'

import { formatAuthors } from '@/utilities/formatAuthors'

import { PostHeroImage, PostHeroImageFallback } from './PostHeroImage'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const hasCategories = Boolean(categories && categories.length > 0)

  const categoryLine = hasCategories
    ? categories?.map((category, index) => {
        if (typeof category === 'object' && category !== null) {
          const categoryTitle = category.title || 'Kategória'
          const isLast = index === (categories?.length ?? 0) - 1
          return (
            <React.Fragment key={category.id ?? index}>
              {categoryTitle}
              {!isLast && ', '}
            </React.Fragment>
          )
        }
        return null
      })
    : null

  return (
    <div className="relative isolate -mt-16 flex min-h-[min(62vh,30rem)] items-end md:-mt-[10.4rem] md:min-h-[min(80vh,52rem)]">
      <div className="relative z-10 flex w-full justify-center px-4 pb-8 text-b-on-primary md:px-6 md:pb-14">
        <div className="w-full max-w-3xl text-left">
          {hasCategories ? (
            <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-b-on-primary/80 md:mb-5">
              {categoryLine}
            </div>
          ) : null}

          <h1 className="mb-5 font-headline text-3xl leading-[1.12] tracking-tight md:mb-8 md:text-5xl lg:text-6xl editorial-spacing">
            {title}
          </h1>

          {hasAuthors || publishedAt ? (
            <div className="flex w-full max-w-2xl flex-col items-start gap-6 border-t border-b-on-primary/25 pt-6 md:flex-row md:gap-14 md:pt-9">
              {hasAuthors ? (
                <div className="flex flex-col items-start gap-1.5 text-left">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-b-on-primary/65">
                    Szerző
                  </p>
                  <p className="font-sans text-sm md:text-base">
                    {formatAuthors(populatedAuthors)}
                  </p>
                </div>
              ) : null}
              {publishedAt ? (
                <div className="flex flex-col items-start gap-1.5 text-left">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-b-on-primary/65">
                    Közzétéve
                  </p>
                  <time className="font-sans text-sm md:text-base" dateTime={publishedAt}>
                    {formatPostDateHu(publishedAt)}
                  </time>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 min-h-[min(62vh,30rem)] select-none md:min-h-[min(80vh,52rem)]">
        {heroImage && typeof heroImage === 'object' ? (
          <Suspense fallback={<PostHeroImageFallback />}>
            <PostHeroImage resource={heroImage} />
          </Suspense>
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-b-primary-container via-b-primary to-b-primary"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-b-primary via-b-primary/55 to-b-primary/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(255_255_255/0.08),transparent_55%)]" />
          </>
        )}
      </div>
    </div>
  )
}
