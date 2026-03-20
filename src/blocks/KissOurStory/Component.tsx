import React from 'react'

import type { KissOurStoryBlock as KissOurStoryBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const KissOurStoryBlock: React.FC<KissOurStoryBlockProps> = (props) => {
  const { heading, image, body, closingStatement, signature, tags } = props
  const imageDoc = image && typeof image === 'object' ? image : null
  const hasImage = Boolean(imageDoc)

  return (
    <section
      aria-labelledby="kiss-our-story-heading"
      className="bg-b-background"
      id="kiss-our-story"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 md:px-12 md:py-14 lg:py-16">
        <div className="relative overflow-hidden bg-b-surface-container-low p-8 md:p-10 lg:p-12 xl:p-14">
          <div aria-hidden className="pointer-events-none absolute top-0 right-0 opacity-[0.07]">
            <span
              className="material-symbols-outlined text-[7.5rem] leading-none text-b-primary md:text-[120px]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}
            >
              eco
            </span>
          </div>

          <div
            className={cn(
              'relative z-10 grid grid-cols-1 gap-6 md:gap-8 lg:items-center lg:gap-x-10 lg:gap-y-4 xl:gap-x-14',
              hasImage && 'lg:grid-cols-[minmax(0,1fr)_minmax(22rem,1.38fr)]',
            )}
          >
            <h2
              className={cn(
                'font-headline text-2xl font-medium italic text-b-primary-container md:text-3xl',
                hasImage && 'lg:col-start-1 lg:row-start-1',
              )}
              id="kiss-our-story-heading"
            >
              {heading}
            </h2>

            {hasImage ? (
              <figure
                className={cn(
                  'min-w-0 overflow-hidden rounded-xl bg-b-surface-container shadow-md shadow-b-primary/5',
                  'lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center',
                )}
              >
                {/* Mobil: fix landscape (16:9) keret + kitöltés */}
                <div className="relative aspect-video w-full lg:hidden">
                  <Media
                    className="absolute inset-0"
                    fill
                    imgClassName="object-cover"
                    resource={imageDoc}
                  />
                </div>
                {/* Asztal: eredeti képarány, szélességre skálázva, nem vágjuk át */}
                <div className="hidden w-full lg:block">
                  <Media
                    pictureClassName="block w-full"
                    imgClassName="h-auto w-full max-w-full object-contain"
                    resource={imageDoc}
                    size="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
              </figure>
            ) : null}

            <div
              className={cn('space-y-5 md:space-y-6', hasImage && 'lg:col-start-1 lg:row-start-2')}
            >
              <div className="font-sans text-base leading-relaxed text-pretty text-b-on-surface/90 md:text-lg lg:max-w-none lg:text-lg lg:leading-relaxed xl:text-xl [&_p+p]:mt-3">
                <p className="whitespace-pre-line">{body}</p>
              </div>

              {closingStatement || signature || (tags && tags.length > 0) ? (
                <div className="w-full min-w-0 space-y-5 border-t border-b-outline-variant/30 pt-6 lg:space-y-4 lg:pt-5">
                  {closingStatement ? (
                    <p className="w-full max-w-none hyphens-none text-left font-headline text-xl font-medium italic text-b-tertiary md:text-2xl">
                      {closingStatement}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    {signature ? (
                      <p className="font-sans text-sm font-semibold tracking-wide text-b-primary md:text-base">
                        — {signature}
                      </p>
                    ) : null}
                    {tags && tags.length > 0 ? (
                      <ul
                        className={cn(
                          'flex flex-wrap gap-2 sm:shrink-0 sm:justify-end',
                          !signature && 'sm:ml-auto',
                        )}
                      >
                        {tags.map((tag, i) =>
                          tag?.label ? (
                            <li key={i}>
                              <span className="inline-block rounded-md bg-b-secondary-container px-4 py-2 font-sans text-sm font-medium text-b-on-secondary-container">
                                {tag.label}
                              </span>
                            </li>
                          ) : null,
                        )}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
