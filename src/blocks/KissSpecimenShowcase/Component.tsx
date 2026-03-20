import React from 'react'

import type { KissSpecimenBlock as KissSpecimenBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const KissSpecimenBlock: React.FC<KissSpecimenBlockProps> = (props) => {
  const {
    eyebrow,
    titleLine1,
    titleLine2,
    listLink,
    featureImage,
    featureBadge,
    featureTitleLine1,
    featureTitleLine2,
    sideImage,
    sideCardLabel,
    cardTitle,
    cardDescription,
    cardLink,
  } = props

  const featureHeading = [featureTitleLine1, featureTitleLine2].filter(Boolean).join(' ')

  return (
    <section className="bg-b-surface" id="kiss-specimen">
      {/* Mobil: „bento” kártyák — más információsűrűség, indokolt eltérés */}
      <div className="bg-b-surface-container-low px-6 py-16 lg:hidden">
        <div className="mb-10">
          {eyebrow ? (
            <span className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-b-secondary">
              {eyebrow}
            </span>
          ) : null}
          <h3 className="font-headline text-2xl leading-snug text-b-primary sm:text-3xl">
            {titleLine1}
            {titleLine2 ? (
              <>
                {' '}
                <span className="font-light italic">{titleLine2}</span>
              </>
            ) : null}
          </h3>
          <div className="mt-3 h-0.5 w-12 bg-b-tertiary" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-4 rounded-xl bg-b-surface-container-lowest p-5 shadow-sm shadow-b-primary/5">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-b-surface-variant">
              {featureImage && typeof featureImage === 'object' ? (
                <Media
                  className="absolute inset-0"
                  fill
                  imgClassName="object-cover"
                  resource={featureImage}
                />
              ) : (
                <div aria-hidden className="absolute inset-0 bg-b-surface-variant" />
              )}
            </div>
            <div>
              {featureBadge ? (
                <span className="font-sans text-[10px] uppercase tracking-tighter text-b-secondary">
                  {featureBadge}
                </span>
              ) : null}
              {featureHeading ? (
                <h4 className="mt-1 font-headline text-xl text-b-primary">{featureHeading}</h4>
              ) : null}
              {listLink && (listLink.url || listLink.type === 'reference') ? (
                <CMSLink
                  {...listLink}
                  appearance="inline"
                  className="mt-2 inline-block font-sans text-sm font-medium text-b-tertiary underline decoration-1 underline-offset-4"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-b-surface-container-lowest p-5 shadow-sm shadow-b-primary/5">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-b-surface-variant">
              {sideImage && typeof sideImage === 'object' ? (
                <Media
                  className="absolute inset-0"
                  fill
                  imgClassName="object-cover"
                  resource={sideImage}
                />
              ) : (
                <div aria-hidden className="absolute inset-0 bg-b-surface-variant" />
              )}
            </div>
            <div>
              {sideCardLabel ? (
                <span className="font-sans text-[10px] uppercase tracking-tighter text-b-secondary">
                  {sideCardLabel}
                </span>
              ) : null}
              {cardTitle ? (
                <h4 className="mt-1 font-headline text-xl text-b-primary">{cardTitle}</h4>
              ) : null}
              {cardLink && (cardLink.url || cardLink.type === 'reference') ? (
                <CMSLink
                  {...cardLink}
                  appearance="inline"
                  className="mt-2 inline-block font-sans text-sm font-medium text-b-tertiary underline decoration-1 underline-offset-4"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Asztali: aszimmetrikus rács */}
      <div className="hidden px-6 py-24 md:px-12 md:py-32 lg:block">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
            <div className="max-w-2xl">
              {eyebrow ? (
                <span className="mb-6 block font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-800/40">
                  {eyebrow}
                </span>
              ) : null}
              <h2 className="font-headline text-4xl leading-tight text-b-primary editorial-spacing md:text-5xl lg:text-6xl">
                {titleLine1}
                {titleLine2 ? (
                  <>
                    <br />
                    <span className="font-light italic">{titleLine2}</span>
                  </>
                ) : null}
              </h2>
            </div>
            {listLink && (listLink.url || listLink.type === 'reference') ? (
              <span className="inline-flex items-center gap-3 border-b border-b-primary/20 pb-2">
                <CMSLink
                  {...listLink}
                  appearance="inline"
                  className="font-sans text-xs uppercase tracking-[0.2em] text-b-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                />
                <span className="material-symbols-outlined text-sm text-b-primary" aria-hidden>
                  north_east
                </span>
              </span>
            ) : null}
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="relative col-span-12 h-full min-h-[20rem] overflow-hidden bg-stone-100 md:col-span-7 md:aspect-auto md:min-h-[28rem]">
              {featureImage && typeof featureImage === 'object' ? (
                <Media
                  className="absolute inset-0 h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  resource={featureImage}
                />
              ) : (
                <div aria-hidden className="absolute inset-0 bg-b-surface-container-low" />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[72%] bg-gradient-to-t from-black/88 via-black/55 via-40% to-transparent"
              />
              <div className="absolute bottom-0 left-0 z-10 w-full p-8 md:p-12">
                {featureBadge ? (
                  <span className="mb-4 inline-block bg-white/90 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-b-primary shadow-sm backdrop-blur-sm md:mb-6 md:px-6">
                    {featureBadge}{' '}
                  </span>
                ) : null}
                {(featureTitleLine1 || featureTitleLine2) && (
                  <h3 className="font-headline text-3xl leading-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-4xl">
                    {featureTitleLine1 ? (
                      <>
                        {featureTitleLine1}
                        <br />
                      </>
                    ) : null}
                    {featureTitleLine2}
                  </h3>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-rows-1 gap-6 md:col-span-5 md:grid-rows-2">
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                {sideImage && typeof sideImage === 'object' ? (
                  <Media
                    className="absolute inset-0"
                    imgClassName="h-full w-full object-cover"
                    resource={sideImage}
                  />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-b-surface-dim" />
                )}
              </div>
              <div className="flex flex-col justify-center border border-stone-100 bg-stone-50 p-8 md:p-12">
                {cardTitle ? (
                  <h3 className="mb-4 font-headline text-2xl text-b-primary md:mb-6 md:text-3xl">
                    {cardTitle}
                  </h3>
                ) : null}
                {cardDescription ? (
                  <p className="mb-6 text-sm font-light leading-relaxed text-b-on-surface-variant/70 md:mb-8">
                    {cardDescription}
                  </p>
                ) : null}
                {cardLink && (cardLink.url || cardLink.type === 'reference') ? (
                  <CMSLink
                    {...cardLink}
                    appearance="inline"
                    className="w-fit border-b border-emerald-900/20 pb-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900 transition-colors hover:border-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
