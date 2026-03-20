'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Menu, X } from 'lucide-react'

import { scrollGlassBlendT, scrollGlassSurfaceStyleFromBlend } from '@/utilities/scrollGlassSurface'

/** A fejléc fix top offsetje = admin sáv alsó éle a nézetben (görgetéskor 0-ra csökken). */
function getHeaderTopPx(): number {
  if (typeof document === 'undefined') return 0
  const el = document.querySelector<HTMLElement>('.admin-bar')
  if (!el || el.classList.contains('hidden')) return 0
  if (getComputedStyle(el).display === 'none') return 0
  return Math.max(0, el.getBoundingClientRect().bottom)
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollBlend, setScrollBlend] = useState(0)
  const [headerTopPx, setHeaderTopPx] = useState(0)
  /** Fejléc belső magasság (h-16 / h-24) — mobil lenyíló pozícióhoz */
  const [headerBarPx, setHeaderBarPx] = useState(64)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const setH = () => setHeaderBarPx(mq.matches ? 96 : 64)
    setH()
    mq.addEventListener('change', setH)
    return () => mq.removeEventListener('change', setH)
  }, [])

  useEffect(() => {
    let rafId = 0
    const update = () => {
      rafId = 0
      setHeaderTopPx(getHeaderTopPx())

      const y = window.scrollY
      setScrollBlend(scrollGlassBlendT(y))
    }
    const schedule = () => {
      if (rafId === 0) rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    const el = document.querySelector<HTMLElement>('.admin-bar')
    let ro: ResizeObserver | undefined
    let mo: MutationObserver | undefined
    if (el) {
      ro = new ResizeObserver(schedule)
      ro.observe(el)
      mo = new MutationObserver(schedule)
      mo.observe(el, { attributes: true, attributeFilter: ['class'] })
    }

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ro?.disconnect()
      mo?.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const siteTitle = data?.siteTitle || 'Kiss Díszfaiskola'

  const headerBorderMix = mobileOpen ? 10 : Math.round(scrollBlend * 10)

  const headerStyle: React.CSSProperties = {
    top: headerTopPx,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: `color-mix(in srgb, var(--color-b-primary, #002824) ${headerBorderMix}%, transparent)`,
    transition: 'border-bottom-color 0.2s ease-out',
    ...scrollGlassSurfaceStyleFromBlend(mobileOpen ? 0 : scrollBlend),
  }

  const mobilePanelTop = headerTopPx + headerBarPx

  return (
    <header
      className="fixed z-50 flex h-16 w-full items-center md:h-24"
      id="kiss-site-header"
      style={headerStyle}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-4 px-4 md:gap-8 md:px-12">
        <div className="shrink-0">
          <Link
            className="block leading-none transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-b-primary"
            href="/"
          >
            <span className="font-headline block text-lg italic tracking-tighter text-emerald-900 sm:text-xl md:text-2xl lg:text-3xl">
              {siteTitle}
            </span>
          </Link>
        </div>
        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-6 lg:flex lg:gap-10">
          <HeaderNav data={data} />
        </nav>
        <div className="ml-auto flex items-center gap-3 md:gap-8">
          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            className="flex text-emerald-900 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            type="button"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div
          className="fixed inset-x-0 z-40 border-b border-stone-200 bg-b-background px-6 py-6 shadow-[var(--shadow-b-ambient)] lg:hidden"
          style={{ top: mobilePanelTop }}
        >
          <nav aria-label="Mobil navigáció" className="flex flex-col gap-4">
            <HeaderNav data={data} mobile />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
