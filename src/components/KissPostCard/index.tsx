'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatPostDateHu } from '@/utilities/formatDateTime'

export type KissPostCardData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'heroImage'
>

export const KissPostCard: React.FC<{
  className?: string
  doc?: KissPostCardData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, heroImage, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const coverMedia =
    metaImage && typeof metaImage === 'object'
      ? metaImage
      : heroImage && typeof heroImage === 'object'
        ? heroImage
        : null

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-[0.75rem] bg-b-surface-container-lowest shadow-b-ambient transition-shadow duration-500 hover:shadow-[0_24px_48px_rgb(0_40_36_/_0.09)]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[0.75rem] bg-b-surface-container-low">
        {coverMedia ? (
          <Media
            className="absolute inset-0 block h-full w-full"
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            pictureClassName="absolute inset-0 block h-full w-full"
            resource={coverMedia}
            size="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-b-secondary-container/50 to-b-surface-dim"
          >
            <span className="material-symbols-outlined text-5xl text-b-on-secondary-container/40">
              article
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 px-5 pt-4 pb-6 md:gap-3 md:px-6 md:pt-4 md:pb-7">
        {publishedAt ? (
          <time
            className="font-sans text-xs font-medium uppercase tracking-wider text-b-on-surface-variant"
            dateTime={publishedAt}
          >
            {formatPostDateHu(publishedAt)}
          </time>
        ) : null}
        {showCategories && hasCategories && (
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-b-secondary">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const categoryTitle = category.title || 'Kategória'
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={category.id ?? index}>
                    {categoryTitle}
                    {!isLast && ', '}
                  </Fragment>
                )
              }
              return null
            })}
          </p>
        )}
        {titleToUse ? (
          <h3 className="font-headline text-xl leading-snug tracking-tight text-b-primary md:text-2xl editorial-spacing">
            <Link
              className="text-b-primary transition-colors hover:text-b-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
              href={href}
              ref={link.ref}
            >
              {titleToUse}
            </Link>
          </h3>
        ) : null}
        {sanitizedDescription ? (
          <p className="line-clamp-3 font-sans text-sm leading-relaxed text-b-on-surface-variant">
            {sanitizedDescription}
          </p>
        ) : null}
      </div>
    </article>
  )
}
