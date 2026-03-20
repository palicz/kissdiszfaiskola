import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type KissHeroFields = Pick<
  Page['hero'],
  | 'eyebrow'
  | 'headingLine1'
  | 'headingLine2'
  | 'description'
  | 'links'
  | 'heroImage'
  | 'overlapImage'
  | 'specimenLabel'
  | 'specimenSublabel'
>

export const KissHomeHero: React.FC<KissHeroFields> = ({
  eyebrow,
  headingLine1,
  headingLine2,
  description,
  links,
  heroImage,
  overlapImage,
  specimenLabel,
  specimenSublabel,
}) => {
  return (
    <section
      aria-label="Kezdő hero"
      className="relative overflow-hidden bg-b-background"
      id="kiss-hero"
    >
      <div className="relative z-10 px-6 py-10 lg:hidden">
        <div className="flex flex-col gap-8">
          <div className="relative z-30 space-y-4">
            {eyebrow ? (
              <span className="font-sans text-xs font-medium uppercase italic tracking-widest text-b-secondary">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="font-headline text-b-primary">
              <span className="block text-3xl leading-tight font-normal tracking-tight text-nowrap sm:text-4xl">
                {headingLine1}
              </span>
              <span className="mt-2 block text-4xl leading-[1.1] font-medium tracking-tight italic sm:text-5xl">
                {headingLine2}
              </span>
            </h2>
            {description ? (
              <p className="max-w-[90%] text-base font-light leading-relaxed text-b-on-surface-variant">
                {description}
              </p>
            ) : null}
            {Array.isArray(links) && links.length > 0 ? (
              <ul className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                {links.map(({ link }, i) => {
                  if (!link?.url && link?.type !== 'reference') return null
                  const isPrimary = link.appearance !== 'outline'
                  return (
                    <li className="w-full sm:w-auto" key={i}>
                      {isPrimary ? (
                        <CMSLink
                          {...link}
                          appearance="inline"
                          className="inline-flex w-full items-center justify-center rounded-md bg-b-primary px-6 py-3 text-center font-sans text-sm font-medium text-b-on-primary transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary sm:w-auto"
                        />
                      ) : (
                        <CMSLink
                          {...link}
                          appearance="inline"
                          className="inline-flex w-full justify-center font-sans text-sm font-medium text-b-tertiary underline decoration-1 underline-offset-4 transition-colors hover:text-b-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary sm:inline sm:w-auto"
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
          <div className="flex w-full justify-center">
            <div className="relative z-10 mt-2 w-[min(100%,22rem)] max-w-md pb-12 pt-4 sm:w-4/5">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-b-surface-container-low shadow-2xl shadow-b-primary/10">
                {heroImage && typeof heroImage === 'object' ? (
                  <Media
                    className="absolute inset-0"
                    fill
                    imgClassName="object-cover"
                    priority
                    resource={heroImage}
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 min-h-[14rem] bg-b-surface-container-low"
                  />
                )}
              </div>
              {overlapImage && typeof overlapImage === 'object' ? (
                <div className="absolute -bottom-8 -left-5 w-1/2 sm:-left-6">
                  <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-b-surface bg-b-surface-container-lowest shadow-xl">
                    <Media
                      className="absolute inset-0"
                      fill
                      imgClassName="object-cover"
                      resource={overlapImage}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto hidden w-full max-w-screen-2xl flex-col pt-2 pb-10 md:pt-3 md:pb-14 lg:flex">
        <div className="grid w-full grid-cols-12 gap-8 md:gap-12 md:px-12 lg:gap-16">
          <div className="relative z-30 order-2 col-span-12 flex min-w-0 flex-col justify-center lg:order-1 lg:col-span-7 lg:pr-4 xl:pr-8">
            <div className="relative max-w-full px-6 md:max-w-2xl md:px-0">
              {eyebrow ? (
                <span className="mb-8 block font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-b-secondary">
                  {eyebrow}
                </span>
              ) : null}
              <h1 className="font-headline text-5xl font-normal leading-[0.95] tracking-tighter text-b-primary editorial-spacing md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="block text-nowrap">{headingLine1}</span>
                <span className="mt-2 block max-w-full text-balance break-words font-light italic text-b-primary/90 lg:mt-3">
                  {headingLine2}
                </span>
              </h1>
              {description ? (
                <p className="mb-12 max-w-lg border-l border-b-primary/20 py-1 pl-6 text-lg font-light leading-relaxed text-b-on-surface-variant/80 md:pl-8">
                  {description}
                </p>
              ) : null}
              {Array.isArray(links) && links.length > 0 ? (
                <ul className="flex flex-wrap items-center gap-6 md:gap-8">
                  {links.map(({ link }, i) => {
                    if (!link?.url && link?.type !== 'reference') return null
                    const isPrimary = link.appearance !== 'outline'
                    return (
                      <li key={i}>
                        {isPrimary ? (
                          <CMSLink
                            {...link}
                            appearance="inline"
                            className={cn(
                              'group relative inline-flex px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-b-on-primary transition-colors duration-300',
                              'bg-b-primary hover:bg-b-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary',
                            )}
                          />
                        ) : (
                          <CMSLink
                            {...link}
                            appearance="inline"
                            className="border-b border-b-primary/20 pb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-b-primary transition-colors hover:border-b-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                          />
                        )}
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="relative z-10 order-1 col-span-12 min-w-0 lg:order-2 lg:col-span-5">
            <div className="relative aspect-4/5 w-full px-6 lg:px-0 lg:pt-4">
              {heroImage && typeof heroImage === 'object' ? (
                <Media
                  className="absolute inset-0"
                  fill
                  imgClassName="object-cover shadow-[var(--shadow-b-ambient)] transition-all duration-1000 [filter:grayscale(20%)] hover:[filter:grayscale(0%)]"
                  priority
                  resource={heroImage}
                />
              ) : (
                <div aria-hidden className="absolute inset-0 bg-b-surface-container-low" />
              )}
              {specimenLabel ? (
                <div className="absolute -bottom-6 -left-4 hidden bg-stone-100 p-6 shadow-[var(--shadow-b-ambient)] md:-left-12 md:block md:p-8">
                  <p className="font-headline text-3xl italic leading-none text-emerald-900 md:text-4xl">
                    {specimenLabel}
                  </p>
                  {specimenSublabel ? (
                    <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-800/40">
                      {specimenSublabel}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 -z-0 hidden h-full w-1/3 bg-stone-100/50 lg:block"
      />
    </section>
  )
}
