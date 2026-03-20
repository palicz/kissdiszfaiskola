import React from 'react'

import type { KissVisitBlock as KissVisitBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const KissVisitBlock: React.FC<KissVisitBlockProps> = (props) => {
  const {
    title,
    image,
    statNumber,
    statLabel,
    hoursHeading,
    hoursRows,
    contactHeading,
    addressTitle,
    addressLines,
  } = props

  const mapsQuery = [addressTitle, addressLines].filter(Boolean).join(', ')
  const mapsHref = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : undefined

  return (
    <section className="bg-stone-50" id="kiss-visit">
      {/* Mobil: kompakt, zöld kártya — a nagy fotó itt háttér-információ helyett háttérbe szorul */}
      <div className="px-6 py-14 lg:hidden">
        <div className="relative overflow-hidden rounded-2xl bg-b-primary p-8 text-b-on-primary shadow-[var(--shadow-b-ambient)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-b-primary-container/25"
          />
          <div className="relative z-10">
            <h3 className="mb-6 font-headline text-2xl font-medium italic sm:text-3xl">{title}</h3>
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-sans text-xs uppercase tracking-widest text-b-on-primary-container">
                  Helyszín
                </p>
                {addressTitle ? <p className="text-lg font-medium">{addressTitle}</p> : null}
                {addressLines ? (
                  <p className="text-base font-light leading-relaxed opacity-95">{addressLines}</p>
                ) : null}
              </div>
              <div>
                {hoursHeading ? (
                  <p className="mb-2 font-sans text-xs uppercase tracking-widest text-b-on-primary-container">
                    {hoursHeading}
                  </p>
                ) : null}
                <ul className="space-y-1 text-sm opacity-90">
                  {hoursRows?.map((row, i) => (
                    <li
                      className={cn(
                        'flex justify-between gap-4',
                        row.muted && 'font-bold text-b-tertiary-fixed',
                      )}
                      key={i}
                    >
                      <span>{row.label}</span>
                      <span className="shrink-0 text-right">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {mapsHref ? (
                <div className="pt-2">
                  <a
                    className="flex w-full items-center justify-center gap-2 no-underline rounded-md bg-b-surface-container-lowest py-4 text-center font-sans text-sm font-medium text-b-primary transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    href={mapsHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden>
                      map
                    </span>
                    Útvonaltervezés
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Asztali: fotó + részletes állapot */}
      <div className="mx-auto hidden max-w-screen-2xl grid-cols-1 items-center gap-16 px-6 py-24 md:px-12 md:py-32 lg:grid lg:grid-cols-2 lg:gap-32">
        <div className="relative">
          {image && typeof image === 'object' ? (
            <Media
              imgClassName="relative z-10 aspect-square w-full object-cover [filter:grayscale(10%)]"
              resource={image}
            />
          ) : (
            <div
              aria-hidden
              className="relative z-10 aspect-square w-full bg-b-surface-container-low"
            />
          )}
          {statNumber ? (
            <div className="absolute -bottom-8 -right-8 z-20 hidden bg-b-primary p-8 md:block md:p-12">
              <span className="font-headline text-4xl font-light italic text-b-on-primary md:text-5xl">
                {statNumber}
              </span>
              {statLabel ? (
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-b-on-primary/60">
                  {statLabel}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
        <div>
          <h2 className="mb-10 font-headline text-4xl font-light italic text-b-primary editorial-spacing md:mb-16 md:text-5xl">
            {title}
          </h2>
          <div className="space-y-12">
            <div>
              {hoursHeading ? (
                <h3 className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-800/40 md:mb-8">
                  {hoursHeading}
                </h3>
              ) : null}
              <div className="space-y-4">
                {hoursRows?.map((row, i) => (
                  <div
                    className={cn(
                      'flex items-center justify-between border-b border-stone-200 pb-4',
                      row.muted && 'opacity-40',
                    )}
                    key={i}
                  >
                    <span className="font-headline text-base text-b-primary md:text-lg">
                      {row.label}
                    </span>
                    <span className="font-sans text-sm font-light tracking-widest text-b-on-surface-variant">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4">
              {contactHeading ? (
                <h3 className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-800/40 md:mb-8">
                  {contactHeading}
                </h3>
              ) : null}
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-3xl font-extralight text-emerald-900"
                  aria-hidden
                >
                  location_on
                </span>
                <div>
                  {addressTitle ? (
                    <p className="mb-1 font-headline text-lg text-b-primary md:text-xl">
                      {addressTitle}
                    </p>
                  ) : null}
                  {addressLines ? (
                    <p className="text-sm font-light leading-relaxed whitespace-pre-line text-b-on-surface-variant/70">
                      {addressLines}
                    </p>
                  ) : null}
                  {mapsHref ? (
                    <a
                      className="mt-4 inline-flex items-center gap-2 no-underline font-sans text-sm font-medium text-b-primary transition-opacity hover:opacity-80"
                      href={mapsHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden>
                        map
                      </span>
                      Útvonaltervezés
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
