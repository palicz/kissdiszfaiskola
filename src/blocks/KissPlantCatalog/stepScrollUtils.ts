export function catalogSectionLeadPx(isLg: boolean): number {
  return isLg ? 36 : 16
}

export function catalogDesktopSpyViewportOffsetPx(headerBottom: number): number {
  const readBand = Math.min(200, Math.max(96, Math.round(window.innerHeight * 0.16)))
  return headerBottom + readBand
}

export function catalogMobileSpyBoostPx(): number {
  if (typeof window === 'undefined') return 64
  return Math.min(112, Math.max(52, Math.round(window.innerHeight * 0.1)))
}

export function measuredSiteHeaderBottomPx(): number {
  const h = document.getElementById('kiss-site-header')
  if (!h) return window.matchMedia('(min-width: 1024px)').matches ? 96 : 64
  return Math.max(48, Math.round(h.getBoundingClientRect().bottom))
}

export function windowScrollY(): number {
  if (typeof window === 'undefined') return 0
  return window.scrollY ?? document.documentElement.scrollTop ?? 0
}

export function docOffsetTop(el: HTMLElement): number {
  const r = el.getBoundingClientRect()
  return r.top + windowScrollY()
}

/** `scroll-margin-top` értéke (fejléc + pill + gap + lead). */
export function catalogScrollMarginPx(isLg: boolean, pillInnerHeightPx: number): number {
  const headerBottom = measuredSiteHeaderBottomPx()
  const ph = isLg ? 0 : Math.max(pillInnerHeightPx, 44)
  const lead = catalogSectionLeadPx(isLg)
  return headerBottom + ph + 12 + lead
}

/** Dokumentum-Y: scroll-spy és asztali léptető közös olvasási vonala. */
export function catalogLineDocY(isLg: boolean, pillInnerHeightPx: number): number {
  const headerBottom = measuredSiteHeaderBottomPx()
  const margin = catalogScrollMarginPx(isLg, pillInnerHeightPx)
  const spyOffset = isLg
    ? catalogDesktopSpyViewportOffsetPx(headerBottom)
    : margin + catalogMobileSpyBoostPx()
  return windowScrollY() + spyOffset
}

const SECTION_EPS = 1

export function resolveActiveSection(
  sectionIds: string[],
  lineDocY: number,
): { id: string | null; index: number } {
  let index = -1
  let id: string | null = null
  for (let i = 0; i < sectionIds.length; i++) {
    const sid = sectionIds[i]!
    const el = document.getElementById(sid)
    if (!el) continue
    if (docOffsetTop(el) <= lineDocY + SECTION_EPS) {
      index = i
      id = sid
    }
  }
  return { id, index }
}
