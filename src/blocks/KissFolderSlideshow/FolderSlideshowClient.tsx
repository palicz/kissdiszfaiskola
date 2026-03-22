'use client'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { getSlideshowObjectFit, SLIDESHOW_CONTAINER_ASPECT } from '@/utilities/slideshowSmartFit'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'

export type FolderSlideshowTransition = 'crossfade' | 'slide' | 'fadeScale' | 'instant'

export type FolderSlideshowClientProps = {
  media: MediaType[]
  transition: FolderSlideshowTransition
  intervalMs: number
  eyebrow?: string | null
  title?: string | null
}

const transitionDurationClass: Record<FolderSlideshowTransition, string> = {
  crossfade: 'duration-700 ease-out',
  slide: 'duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
  fadeScale: 'duration-[600ms] ease-out',
  instant: 'duration-0',
}

export function FolderSlideshowClient({
  media,
  transition,
  intervalMs,
  eyebrow,
  title,
}: FolderSlideshowClientProps) {
  const sectionId = useId()
  const labelId = useId()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const n = media.length

  const safeInterval = useMemo(() => Math.min(20000, Math.max(2000, intervalMs)), [intervalMs])
  const effectiveInterval = reduceMotion ? Math.min(safeInterval, 8000) : safeInterval

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % n)
  }, [n])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n)
  }, [n])

  useEffect(() => {
    if (paused || n <= 1) return
    const id = setInterval(goNext, effectiveInterval)
    return () => clearInterval(id)
  }, [paused, n, effectiveInterval, goNext])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const dur = transitionDurationClass[transition]
  const instant = transition === 'instant' || reduceMotion
  const useSlide = transition === 'slide' && !reduceMotion

  return (
    <section
      aria-labelledby={title ? labelId : undefined}
      aria-roledescription="carousel"
      className="bg-b-surface-container-low py-12 md:py-16 lg:py-20"
      id={sectionId}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
        {(eyebrow || title) && (
          <header className="mb-8 max-w-3xl md:mb-10">
            {eyebrow ? (
              <span className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-b-on-surface-variant">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2
                className="font-headline text-3xl font-medium text-b-primary md:text-4xl lg:text-5xl"
                id={labelId}
              >
                {title}
              </h2>
            ) : null}
          </header>
        )}

        <div
          aria-roledescription="slide"
          className="relative overflow-hidden rounded-[2px] bg-b-surface-dim shadow-b-ambient"
        >
          <div className="relative aspect-video w-full">
            {useSlide ? (
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className={cn('flex h-full', dur, !instant && 'transition-transform')}
                  style={{
                    transform: `translateX(-${(100 / n) * index}%)`,
                    width: `${n * 100}%`,
                  }}
                >
                  {media.map((m, i) => {
                    const fit = getSlideshowObjectFit(m, SLIDESHOW_CONTAINER_ASPECT)
                    const imgClass = fit === 'contain' ? 'object-contain' : 'object-cover'
                    return (
                      <div
                        className="relative h-full shrink-0"
                        key={m.id}
                        style={{ width: `${100 / n}%` }}
                      >
                        <Media
                          fill
                          imgClassName={imgClass}
                          priority={i === 0}
                          resource={m}
                          size="(max-width: 1023px) 100vw, 90vw"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              media.map((m, i) => {
                const fit = getSlideshowObjectFit(m, SLIDESHOW_CONTAINER_ASPECT)
                const imgClass = fit === 'contain' ? 'object-contain' : 'object-cover'
                const zoomOk = fit === 'cover' && transition === 'fadeScale' && !reduceMotion

                return (
                  <div
                    className={cn(
                      'absolute inset-0 transition-[opacity,transform]',
                      dur,
                      instant && 'transition-none',
                      i === index ? 'z-1 opacity-100' : 'z-0 opacity-0',
                      zoomOk && i !== index && 'scale-[0.98]',
                      zoomOk && i === index && 'scale-100',
                    )}
                    aria-hidden={i !== index}
                    key={m.id}
                  >
                    <Media
                      fill
                      imgClassName={imgClass}
                      priority={i === 0}
                      resource={m}
                      size="(max-width: 1023px) 100vw, 90vw"
                    />
                  </div>
                )
              })
            )}
          </div>

          {n > 1 ? (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/45 to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 z-[3] flex flex-col gap-2 px-3 pb-3 pt-4 md:px-5 md:pb-4">
                <div
                  className="h-0.5 w-full overflow-hidden rounded-full bg-white/20"
                  role="presentation"
                >
                  <div
                    className="h-full origin-left scale-x-100 rounded-full bg-b-tertiary/90"
                    key={`${index}-${paused}-${reduceMotion}`}
                    style={{
                      animation:
                        paused || reduceMotion
                          ? undefined
                          : `slideshow-progress ${effectiveInterval}ms linear forwards`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p aria-live="polite" className="font-sans text-xs text-white/90">
                    {index + 1} / {n}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      aria-label="Előző kép"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      onClick={goPrev}
                      type="button"
                    >
                      <ChevronLeft aria-hidden className="h-5 w-5" />
                    </button>
                    <button
                      aria-label={paused ? 'Lejátszás' : 'Szünet'}
                      aria-pressed={paused}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      onClick={() => setPaused((p) => !p)}
                      type="button"
                    >
                      {paused ? (
                        <Play aria-hidden className="h-5 w-5" />
                      ) : (
                        <Pause aria-hidden className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      aria-label="Következő kép"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      onClick={goNext}
                      type="button"
                    >
                      <ChevronRight aria-hidden className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
