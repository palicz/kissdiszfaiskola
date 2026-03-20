'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { KissContactDetailsBlock as KissContactDetailsBlockProps } from '@/payload-types'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

/** Csak megbízható HTTPS Google Maps embed URL-ek. */
function getSafeMapEmbedSrc(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null
  try {
    const u = new URL(raw.trim())
    if (u.protocol !== 'https:') return null
    const host = u.hostname.toLowerCase()
    const isGoogleMaps =
      host === 'www.google.com' ||
      host === 'google.com' ||
      (host.endsWith('.google.com') && u.pathname.includes('/maps'))
    if (!isGoogleMaps) return null
    return u.toString()
  } catch {
    return null
  }
}

export const KissContactDetailsBlock: React.FC<
  KissContactDetailsBlockProps & { disableInnerContainer?: boolean }
> = (props) => {
  const {
    disableInnerContainer: _ignored,
    title,
    intro,
    phone,
    email,
    addressLabel,
    addressLines,
    images,
    mapHeading,
    mapEmbedUrl,
  } = props

  const mapSrc = getSafeMapEmbedSrc(mapEmbedUrl ?? undefined)
  const imageItems = images?.filter((row) => row?.image && typeof row.image === 'object') ?? []

  const hasContact =
    Boolean(phone?.trim()) ||
    Boolean(email?.trim()) ||
    Boolean(addressLines?.trim()) ||
    Boolean(addressLabel?.trim())

  return (
    <section className="bg-b-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
        <header className="mb-8 max-w-3xl md:mb-10">
          <h2 className="font-headline text-3xl font-medium text-b-primary md:text-4xl">{title}</h2>
          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-b-on-surface-variant md:text-lg">
              {intro}
            </p>
          ) : null}
        </header>

        <div
          className={cn(
            'grid gap-10 lg:gap-12',
            mapSrc ? 'lg:grid-cols-2 lg:items-start' : 'max-w-3xl',
          )}
        >
          <div className="min-w-0 space-y-8">
            {hasContact ? (
              <ul className="space-y-6">
                {phone?.trim() ? (
                  <li className="flex gap-4">
                    <span className="mt-0.5 shrink-0 text-b-primary" aria-hidden>
                      <Phone className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-medium uppercase tracking-widest text-b-on-surface-variant">
                        Telefon
                      </p>
                      <a
                        className="mt-1 inline-block font-sans text-lg text-b-primary underline decoration-b-primary/30 underline-offset-4 transition hover:decoration-b-primary"
                        href={`tel:${phone.replace(/\s/g, '')}`}
                      >
                        {phone.trim()}
                      </a>
                    </div>
                  </li>
                ) : null}
                {email?.trim() ? (
                  <li className="flex gap-4">
                    <span className="mt-0.5 shrink-0 text-b-primary" aria-hidden>
                      <Mail className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-medium uppercase tracking-widest text-b-on-surface-variant">
                        E-mail
                      </p>
                      <a
                        className="mt-1 inline-block break-all font-sans text-lg text-b-primary underline decoration-b-primary/30 underline-offset-4 transition hover:decoration-b-primary"
                        href={`mailto:${email.trim()}`}
                      >
                        {email.trim()}
                      </a>
                    </div>
                  </li>
                ) : null}
                {addressLines?.trim() || addressLabel?.trim() ? (
                  <li className="flex gap-4">
                    <span className="mt-0.5 shrink-0 text-b-primary" aria-hidden>
                      <MapPin className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-medium uppercase tracking-widest text-b-on-surface-variant">
                        {addressLabel?.trim() || 'Cím'}
                      </p>
                      {addressLines?.trim() ? (
                        <p className="mt-1 whitespace-pre-line font-sans text-base leading-relaxed text-b-on-surface">
                          {addressLines.trim()}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ) : null}
              </ul>
            ) : null}

            {imageItems.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-2">
                {imageItems.map((row, i) => {
                  const img = row.image && typeof row.image === 'object' ? row.image : null
                  if (!img) return null
                  return (
                    <li className="min-w-0" key={i}>
                      <figure>
                        <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-b-surface-container shadow-sm">
                          <Media
                            fill
                            imgClassName="object-cover"
                            resource={img}
                            size="(max-width: 1023px) 45vw, 28vw"
                          />
                        </div>
                        {row.caption?.trim() ? (
                          <figcaption className="mt-2 text-center font-sans text-sm text-b-on-surface-variant">
                            {row.caption.trim()}
                          </figcaption>
                        ) : null}
                      </figure>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>

          {mapSrc ? (
            <div className="min-w-0">
              {mapHeading?.trim() ? (
                <h3 className="mb-4 font-headline text-xl font-medium text-b-primary md:text-2xl">
                  {mapHeading.trim()}
                </h3>
              ) : null}
              <div className="overflow-hidden rounded-xl border border-b-outline-variant/40 bg-b-surface-container-low shadow-sm">
                <div className="relative aspect-video w-full">
                  <iframe
                    allowFullScreen
                    className="absolute inset-0 size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapSrc}
                    title={mapHeading?.trim() || 'Térkép'}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
