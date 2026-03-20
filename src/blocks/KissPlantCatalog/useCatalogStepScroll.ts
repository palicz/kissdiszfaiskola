'use client'

import { useEffect, useRef } from 'react'

import { catalogLineDocY, resolveActiveSection } from './stepScrollUtils'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Asztali (lg+) léptetős görgetés egérrel / trackpad-del. Mobilon nincs.
 */
export function useCatalogStepScroll(
  sectionIds: string[],
  catalogRootRef: React.RefObject<HTMLElement | null>,
  pillInnerRef: React.RefObject<HTMLElement | null>,
  isLg: boolean,
): void {
  const isLgRef = useRef(isLg)
  const pillRef = useRef(pillInnerRef)
  const sectionIdsRef = useRef(sectionIds)
  const scrollLockUntil = useRef(0)

  isLgRef.current = isLg
  pillRef.current = pillInnerRef
  sectionIdsRef.current = sectionIds

  useEffect(() => {
    if (!isLg || sectionIds.length === 0 || prefersReducedMotion()) return

    const catalogVisibleRef = { current: false }
    const root = catalogRootRef.current ?? document.getElementById('kiss-plant-catalog-top')
    if (!root || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        catalogVisibleRef.current = entries.some((e) => e.isIntersecting)
      },
      { threshold: 0 },
    )
    io.observe(root)

    const onWheel = (e: WheelEvent) => {
      if (!catalogVisibleRef.current || e.ctrlKey) return
      if (Date.now() < scrollLockUntil.current) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < 12) return

      const ids = sectionIdsRef.current
      if (ids.length === 0) return

      const desktop = isLgRef.current
      const pillH = pillRef.current.current?.offsetHeight ?? 0
      const lineY = catalogLineDocY(desktop, pillH)
      let idx = resolveActiveSection(ids, lineY).index
      if (idx < 0) idx = 0

      const el = document.getElementById(ids[idx]!)
      if (!el) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const down = e.deltaY > 0

      if (down) {
        if (rect.bottom > vh - 6) return
        if (idx >= ids.length - 1) return
        e.preventDefault()
        const next = document.getElementById(ids[idx + 1]!)
        if (!next) return
        scrollLockUntil.current = Date.now() + 420
        next.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (rect.top < -8) return
      if (idx <= 0) return
      e.preventDefault()
      const prev = document.getElementById(ids[idx - 1]!)
      if (!prev) return
      scrollLockUntil.current = Date.now() + 420
      prev.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      io.disconnect()
      window.removeEventListener('wheel', onWheel)
    }
  }, [sectionIds.length, catalogRootRef, isLg])
}
