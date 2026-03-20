'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { KissSplitFeatureBlock as KissSplitFeatureBlockProps } from '@/payload-types'
import React from 'react'

export const KissSplitFeatureBlock: React.FC<
  KissSplitFeatureBlockProps & { disableInnerContainer?: boolean }
> = (props) => {
  const {
    disableInnerContainer: _ignored,
    eyebrow,
    title,
    showTitleRule,
    intro,
    bulletItems,
    image,
    imagePosition,
    imageAlt,
  } = props

  const img = image && typeof image === 'object' ? image : null
  const bullets = bulletItems?.filter((b) => b?.text?.trim()) ?? []
  const imageRight = imagePosition !== 'left'

  const textBlock = (
    <div className="min-w-0">
      {eyebrow?.trim() ? (
        <p className="mb-2 font-sans text-xs font-medium uppercase tracking-widest text-b-secondary">
          {eyebrow.trim()}
        </p>
      ) : null}
      <h2
        className={cn(
          'font-headline text-3xl font-medium text-b-primary md:text-4xl',
          showTitleRule !== false && 'border-b border-b-primary/35 pb-3',
        )}
      >
        {title}
      </h2>
      {intro?.trim() ? (
        <p className="mt-5 text-base leading-relaxed text-b-on-surface-variant md:text-lg">
          {intro.trim()}
        </p>
      ) : null}
      {bullets.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {bullets.map((item, i) => (
            <li
              className="relative pl-7 text-base leading-relaxed text-b-on-surface md:text-[1.05rem]"
              key={i}
            >
              <span
                aria-hidden
                className="absolute top-2 left-0 size-2.5 rounded-full bg-b-primary"
              />
              <span className="whitespace-pre-line">{item.text!.trim()}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )

  const imageBlock = img ? (
    <figure className="min-w-0 overflow-hidden rounded-xl bg-b-surface-container shadow-md shadow-b-primary/8">
      <div className="relative aspect-4/3 w-full md:aspect-3/2 lg:aspect-4/5">
        <Media
          alt={imageAlt ?? undefined}
          className="absolute inset-0"
          fill
          imgClassName="object-cover"
          resource={img}
          size="(max-width: 1023px) 100vw, 45vw"
        />
      </div>
    </figure>
  ) : null

  return (
    <section className="bg-b-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
        <div
          className={cn(
            'grid gap-10 lg:items-start lg:gap-14',
            imageRight
              ? 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'
              : 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]',
          )}
        >
          {imageRight ? (
            <>
              {textBlock}
              {imageBlock}
            </>
          ) : (
            <>
              {imageBlock}
              {textBlock}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
