'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

import type { KissPlantCatalogBlock as KissPlantCatalogBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { scrollGlassBlendT, scrollGlassSurfaceStyleFromBlend } from '@/utilities/scrollGlassSurface'
import { cn } from '@/utilities/ui'

import {
  catalogLineDocY,
  catalogScrollMarginPx,
  measuredSiteHeaderBottomPx,
  resolveActiveSection,
} from './stepScrollUtils'
import { useCatalogStepScroll } from './useCatalogStepScroll'

function useCatalogActiveSection(
  sectionIds: string[],
  pillInnerRef: React.RefObject<HTMLElement | null>,
) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isLg, setIsLg] = useState(false)
  const [scrollMarginPx, setScrollMarginPx] = useState(120)
  const [stickyTopPx, setStickyTopPx] = useState(64)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => setIsLg(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const tick = () => {
      setStickyTopPx(measuredSiteHeaderBottomPx())
      const pillH = pillInnerRef.current?.offsetHeight ?? 0
      setScrollMarginPx(catalogScrollMarginPx(isLg, pillH))
      const lineDocY = catalogLineDocY(isLg, pillH)
      setActiveId(resolveActiveSection(sectionIds, lineDocY).id)
    }

    const tickAfterHash = () => {
      tick()
      window.setTimeout(tick, 32)
      window.setTimeout(tick, 120)
    }

    tick()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    window.addEventListener('hashchange', tickAfterHash)
    const postLayout = window.setTimeout(tick, 0)
    const postLayoutLate = window.setTimeout(tick, 320)
    const postLayoutLater = window.setTimeout(tick, 620)

    return () => {
      window.clearTimeout(postLayout)
      window.clearTimeout(postLayoutLate)
      window.clearTimeout(postLayoutLater)
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      window.removeEventListener('hashchange', tickAfterHash)
    }
  }, [sectionIds, isLg, pillInnerRef])

  return { activeId, isLg, scrollMarginPx, stickyTopPx }
}

/** Mobilon vízszintesen középre görgeti az aktív pillt, ha az új szakasz linkje nem látszik. */
function useScrollCatalogActivePillIntoView(
  activeId: string | null,
  isLg: boolean,
  pillScrollerRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (isLg || !activeId) return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      const root = pillScrollerRef.current
      if (!root) return

      const safeId = typeof CSS !== 'undefined' && 'escape' in CSS ? CSS.escape(activeId) : activeId
      const link = root.querySelector<HTMLElement>(`a[href="#${safeId}"]`)
      if (!link) return

      const rootRect = root.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      const margin = 8
      if (linkRect.left >= rootRect.left + margin && linkRect.right <= rootRect.right - margin) {
        return
      }

      const delta = linkRect.left + linkRect.width / 2 - rootRect.left - root.clientWidth / 2
      root.scrollTo({ left: root.scrollLeft + delta, behavior: 'smooth' })
    }

    const id1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run)
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(id1)
    }
  }, [activeId, isLg, pillScrollerRef])
}

const SIDEBAR_ICONS = [
  'filter_vintage',
  'park',
  'forest',
  'nature',
  'psychiatry',
  'potted_plant',
  'grass',
] as const

type CatalogSection = NonNullable<KissPlantCatalogBlockProps['sections']>[number]

function splitListLines(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function ListLine({ line }: { line: string }): React.ReactNode {
  const idx = line.indexOf(':')
  if (idx > 0 && idx < line.length - 1) {
    const label = line.slice(0, idx + 1)
    const rest = line.slice(idx + 1).trim()
    return (
      <>
        <span className="font-semibold text-b-primary">{label}</span>
        {rest ? <> {rest}</> : null}
      </>
    )
  }
  return line
}

function GroupLists({ groups }: { groups: CatalogSection['groups'] }): React.ReactNode {
  if (!groups?.length) return null

  return (
    <div className="space-y-8">
      {groups.map((g, i) => {
        const lines = splitListLines(g?.listContent)
        if (!g?.heading && !g?.intro && lines.length === 0) return null
        return (
          <div className="space-y-2" key={i}>
            {g.heading ? (
              <h3 className="font-headline text-xl font-medium text-b-tertiary md:text-2xl">
                {g.heading}
              </h3>
            ) : null}
            {g.intro ? (
              <p className="text-sm leading-relaxed text-b-on-surface-variant md:text-base">
                {g.intro}
              </p>
            ) : null}
            {lines.length > 0 ? (
              <ul className="list-disc space-y-1.5 pl-5 marker:text-b-secondary">
                {lines.map((line, j) => (
                  <li className="text-sm leading-relaxed text-b-on-surface md:text-base" key={j}>
                    <ListLine line={line} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

function SectionMediaMobile({
  image,
  imageSecondary,
  imageCaption,
}: {
  image: CatalogSection['image']
  imageSecondary: CatalogSection['imageSecondary']
  imageCaption: CatalogSection['imageCaption']
}) {
  const main = image && typeof image === 'object' ? image : null
  const sec = imageSecondary && typeof imageSecondary === 'object' ? imageSecondary : null

  if (!main && !sec) return null

  if (main && sec) {
    return (
      <figure className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-b-surface-container">
            <Media className="absolute inset-0" fill imgClassName="object-cover" resource={main} />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-b-surface-container">
            <Media className="absolute inset-0" fill imgClassName="object-cover" resource={sec} />
          </div>
        </div>
        {imageCaption ? (
          <figcaption className="text-xs text-b-on-surface-variant">{imageCaption}</figcaption>
        ) : null}
      </figure>
    )
  }

  if (main) {
    return (
      <figure className="space-y-2">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-b-surface-container">
          <Media className="absolute inset-0" fill imgClassName="object-cover" resource={main} />
        </div>
        {imageCaption ? (
          <figcaption className="text-xs text-b-on-surface-variant">{imageCaption}</figcaption>
        ) : null}
      </figure>
    )
  }

  return null
}

function SectionMediaDesktop({
  image,
  imageCaption,
}: {
  image: CatalogSection['image']
  imageCaption: CatalogSection['imageCaption']
}) {
  const doc = image && typeof image === 'object' ? image : null
  if (!doc) {
    return null
  }

  return (
    <figure className="space-y-2">
      <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-b-surface-container shadow-md shadow-b-primary/5">
        <Media className="absolute inset-0" fill imgClassName="object-cover" resource={doc} />
      </div>
      {imageCaption ? (
        <figcaption className="text-xs text-b-on-surface-variant">{imageCaption}</figcaption>
      ) : null}
    </figure>
  )
}

export const KissPlantCatalogBlock: React.FC<
  KissPlantCatalogBlockProps & { disableInnerContainer?: boolean }
> = (props) => {
  const { disableInnerContainer: _ignored, ...block } = props
  const { title, eyebrow, introImage, introBody, introNote, sections: sectionList } = block

  const sections = sectionList?.filter((s) => s?.anchorId && s?.title) ?? []
  const introImg = introImage && typeof introImage === 'object' ? introImage : null

  const catalogRootRef = useRef<HTMLDivElement | null>(null)
  const pillBarRef = useRef<HTMLDivElement | null>(null)
  const sectionIds = useMemo(
    () =>
      sections
        .map((s) => s.anchorId)
        .filter((id): id is string => typeof id === 'string' && id.length > 0),
    [sections],
  )
  const { activeId, isLg, scrollMarginPx, stickyTopPx } = useCatalogActiveSection(
    sectionIds,
    pillBarRef,
  )
  useCatalogStepScroll(sectionIds, catalogRootRef, pillBarRef, isLg)
  useScrollCatalogActivePillIntoView(activeId, isLg, pillBarRef)

  const [pillGlassStyle, setPillGlassStyle] = useState<React.CSSProperties>(() =>
    scrollGlassSurfaceStyleFromBlend(0),
  )
  useEffect(() => {
    if (isLg) return
    const update = () => {
      setPillGlassStyle(scrollGlassSurfaceStyleFromBlend(scrollGlassBlendT(window.scrollY)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isLg])

  return (
    <div className="bg-b-background" id="kiss-plant-catalog-top" ref={catalogRootRef}>
      <div className="mx-auto max-w-screen-2xl px-4 pt-0 pb-2 md:px-8 md:pt-10 lg:px-10 lg:pt-14 xl:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12 xl:gap-16">
          {/* Asztali katalógus oldalsáv — csak szakaszok, scroll-spy */}
          <aside className="hidden w-56 shrink-0 lg:block lg:border-r lg:border-b-outline-variant/20 lg:pr-8">
            <div className="sticky space-y-1 py-2" style={{ top: `${stickyTopPx + 16}px` }}>
              <p className="font-headline text-lg font-medium text-b-primary">Katalógus</p>
              <p className="text-xs uppercase tracking-widest text-b-on-surface-variant">
                Ugrás a szakaszokhoz
              </p>
              <nav aria-label="Katalógus szakaszok" className="mt-6 flex flex-col gap-0.5">
                {sections.map((s, i) => {
                  const active = activeId === s.anchorId
                  return (
                    <a
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-b-secondary-container font-semibold text-b-on-secondary-container'
                          : 'font-medium text-b-on-surface-variant hover:bg-b-surface-container hover:text-b-primary',
                      )}
                      href={`#${s.anchorId}`}
                      key={s.anchorId}
                    >
                      <span
                        className={cn(
                          'material-symbols-outlined text-lg',
                          active ? 'text-b-on-secondary-container' : 'text-b-secondary',
                        )}
                        aria-hidden
                      >
                        {SIDEBAR_ICONS[i % SIDEBAR_ICONS.length]}
                      </span>
                      {s.title}
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Mobil pillbar sticky: a ragadó szülője ez az egész oszlop legyen, ne egy rövid wrapper. */}
          <div className="min-w-0 flex-1 pb-16">
            <div
              className={cn(
                'sticky z-40 mb-8 -mx-4 border-b border-b-primary/10 lg:hidden',
                'shadow-[0_4px_20px_rgba(1,40,36,0.06)]',
              )}
              style={{ top: `${stickyTopPx}px`, ...pillGlassStyle }}
            >
              <div className="relative">
                <div
                  className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 bg-linear-to-l from-b-background to-transparent"
                  aria-hidden
                />
                <div
                  ref={pillBarRef}
                  className={cn(
                    'flex snap-x snap-mandatory items-center gap-2 overflow-x-auto scroll-smooth px-4 py-2',
                    '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                  )}
                >
                  {sections.map((s) => {
                    const active = activeId === s.anchorId
                    return (
                      <a
                        className={cn(
                          'shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap no-underline ring-2 transition-shadow',
                          active
                            ? 'bg-b-primary text-b-on-primary ring-b-primary/25 shadow-md'
                            : 'bg-b-surface-container-high text-b-on-surface ring-transparent hover:bg-b-surface-container hover:ring-b-outline-variant/40',
                        )}
                        href={`#${s.anchorId}`}
                        key={s.anchorId}
                      >
                        {s.title}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bevezető */}
            <header className="mb-12 space-y-6 lg:mb-16">
              {eyebrow ? (
                <p className="text-xs font-medium tracking-[0.2em] text-b-tertiary uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="font-headline text-4xl leading-[0.95] font-medium text-b-primary italic tracking-tight md:text-5xl lg:text-6xl">
                {title}
              </h1>

              <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
                <div
                  className={cn(
                    'order-2 space-y-4 lg:order-1',
                    introImg ? 'lg:col-span-5' : 'lg:col-span-12',
                  )}
                >
                  {introImg ? (
                    <div className="relative aspect-4/5 overflow-hidden rounded-lg shadow-md shadow-b-primary/5 lg:hidden">
                      <Media
                        className="absolute inset-0"
                        fill
                        imgClassName="object-cover"
                        priority
                        resource={introImg}
                      />
                    </div>
                  ) : null}

                  {introBody ? (
                    <p className="text-base leading-relaxed text-b-on-surface-variant md:text-lg">
                      {introBody}
                    </p>
                  ) : null}
                  {introNote ? (
                    <aside className="border-l-2 border-b-tertiary/50 bg-b-surface-container-low p-4 text-sm leading-relaxed text-b-primary italic md:text-base">
                      {introNote}
                    </aside>
                  ) : null}
                </div>

                <div className="order-1 hidden lg:order-2 lg:col-span-7 lg:block">
                  {introImg ? (
                    <div className="relative aspect-4/5 overflow-hidden rounded-lg shadow-md shadow-b-primary/5">
                      <Media
                        className="absolute inset-0"
                        fill
                        imgClassName="object-cover"
                        priority
                        resource={introImg}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </header>

            {/* Szakaszok */}
            <div className="space-y-16 lg:space-y-28">
              {sections.map((section) => {
                const layout = section.desktopLayout ?? 'textLeftImageRight'
                const isStacked = layout === 'stacked'
                const textLeft = layout === 'textLeftImageRight'
                const mainImage =
                  section.image && typeof section.image === 'object' ? section.image : null

                return (
                  <article
                    className="border-b border-b-outline-variant/15 pb-16 last:border-b-0 last:pb-0"
                    id={section.anchorId ?? undefined}
                    key={section.anchorId}
                    style={{ scrollMarginTop: `${scrollMarginPx}px` }}
                  >
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-b-outline-variant/25 pb-2 lg:hidden">
                      <h2 className="font-headline text-3xl font-medium text-b-primary italic">
                        {section.title}
                      </h2>
                      {section.eyebrow ? (
                        <span className="max-w-[40%] text-right text-[10px] uppercase tracking-widest text-b-on-surface-variant">
                          {section.eyebrow}
                        </span>
                      ) : null}
                    </div>

                    <div className="lg:hidden">
                      <SectionMediaMobile
                        image={section.image}
                        imageCaption={section.imageCaption}
                        imageSecondary={section.imageSecondary}
                      />
                    </div>

                    {isStacked && mainImage ? (
                      <div className="mt-8 hidden max-w-4xl lg:block">
                        <SectionMediaDesktop
                          image={section.image}
                          imageCaption={section.imageCaption}
                        />
                      </div>
                    ) : null}

                    <div
                      className={cn(
                        'mt-6 min-w-0 lg:mt-0',
                        !isStacked && 'lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12',
                      )}
                    >
                      <div
                        className={cn(
                          'space-y-6',
                          !isStacked && (mainImage ? 'lg:col-span-5' : 'lg:col-span-12'),
                          !isStacked && mainImage && textLeft && 'lg:col-start-1',
                          !isStacked && mainImage && !textLeft && 'lg:col-start-8',
                          !isStacked && !mainImage && 'lg:col-start-1',
                        )}
                      >
                        <div className="hidden lg:block">
                          <h2 className="font-headline text-4xl font-medium text-b-primary italic tracking-tight xl:text-5xl">
                            {section.title}
                          </h2>
                          {section.eyebrow ? (
                            <p className="mt-2 text-xs uppercase tracking-widest text-b-on-surface-variant">
                              {section.eyebrow}
                            </p>
                          ) : null}
                        </div>

                        {section.description ? (
                          <p className="text-sm leading-relaxed text-b-on-surface-variant md:text-base">
                            {section.description}
                          </p>
                        ) : null}

                        <GroupLists groups={section.groups} />
                      </div>

                      {!isStacked && mainImage ? (
                        <div
                          className={cn(
                            'mt-8 hidden min-w-0 lg:col-span-7 lg:block',
                            textLeft && 'lg:col-start-6',
                            !textLeft && 'lg:col-start-1',
                          )}
                        >
                          <SectionMediaDesktop
                            image={section.image}
                            imageCaption={section.imageCaption}
                          />
                        </div>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
