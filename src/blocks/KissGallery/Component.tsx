'use client'

import { Media } from '@/components/Media'
import type { KissGalleryBlock as KissGalleryBlockProps } from '@/payload-types'
import { X } from 'lucide-react'
import React, { useCallback, useEffect, useId, useState } from 'react'

export const KissGalleryBlock: React.FC<
  KissGalleryBlockProps & { disableInnerContainer?: boolean }
> = (props) => {
  const { disableInnerContainer: _ignored, title, intro, items: itemsRaw } = props
  const items = itemsRaw?.filter((it) => it?.image && it?.caption?.trim()) ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const titleId = useId()
  const dialogId = useId()

  const close = useCallback(() => {
    setOpenIndex(null)
  }, [])

  const openAt = useCallback((i: number) => {
    setOpenIndex(i)
  }, [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.documentElement.classList.add('overflow-hidden')
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', onKey)
    }
  }, [openIndex, close])

  const openItem = openIndex !== null ? items[openIndex] : null
  const openResource = openItem?.image && typeof openItem.image === 'object' ? openItem.image : null

  return (
    <section aria-labelledby={titleId} className="bg-b-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
        <header className="mb-8 max-w-3xl md:mb-10 lg:mb-12">
          <h2
            className="font-headline text-3xl font-medium text-b-primary md:text-4xl lg:text-5xl"
            id={titleId}
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-b-on-surface-variant md:text-lg">
              {intro}
            </p>
          ) : null}
        </header>

        <ul className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => {
            const img = item.image && typeof item.image === 'object' ? item.image : null
            const mediaKey = img && 'id' in img && img.id != null ? String(img.id) : `i${i}`

            if (!img) return null

            return (
              <li className="min-w-0" key={`${mediaKey}-${i}`}>
                <button
                  aria-haspopup="dialog"
                  className="group block w-full cursor-zoom-in text-left"
                  onClick={() => openAt(i)}
                  type="button"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-lg bg-b-surface-container shadow-sm shadow-b-primary/5">
                    <Media
                      fill
                      imgClassName="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      resource={img}
                      size="(max-width: 1023px) 50vw, 25vw"
                    />
                  </span>
                  <span className="mt-2 block text-center font-headline text-sm font-medium text-b-primary md:text-base">
                    {item.caption}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {openIndex !== null && openResource ? (
        <div
          aria-label={openItem?.caption ? `Kinagyítva · ${openItem.caption}` : 'Kinagyított kép'}
          aria-modal="true"
          className="fixed inset-0 z-100 flex flex-col bg-black/75 p-4 backdrop-blur-sm md:p-8"
          id={dialogId}
          onClick={close}
          role="dialog"
        >
          <button
            aria-label="Bezárás"
            className="pointer-events-auto absolute top-3 right-3 z-50 rounded-full bg-b-background/90 p-2 text-b-primary shadow-md transition hover:bg-b-background md:top-6 md:right-6"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            type="button"
          >
            <X aria-hidden className="size-6" />
          </button>
          <div className="pointer-events-none flex min-h-0 flex-1 flex-col items-center justify-center">
            <figure
              className="pointer-events-auto flex max-h-[min(85vh,900px)] w-full max-w-5xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden rounded-lg">
                <Media
                  className="flex justify-center"
                  imgClassName="max-h-[min(78vh,820px)] w-auto max-w-full object-contain"
                  resource={openResource}
                />
              </div>
              {openItem?.caption ? (
                <figcaption className="max-w-2xl text-center font-headline text-lg font-medium text-white drop-shadow-sm md:text-xl">
                  {openItem.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </div>
      ) : null}
    </section>
  )
}
