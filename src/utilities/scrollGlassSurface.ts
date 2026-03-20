import type { CSSProperties } from 'react'

/** Ennyi px görgetésre nyílik ki teljesen az üveg hatás — egyezzen a fő fejléccel. */
export const SCROLL_GLASS_RANGE_PX = 220

export function scrollGlassBlendT(scrollY: number): number {
  const linear = Math.min(Math.max(scrollY / SCROLL_GLASS_RANGE_PX, 0), 1)
  return Math.pow(linear, 0.85)
}

/** Görgetés-alapú, a fejlécével megegyező color-mix + háttér életlenítés. */
export function scrollGlassSurfaceStyleFromBlend(blendT: number): CSSProperties {
  const solidRatio = 1 - blendT * 0.22
  const blurPx = blendT * 10
  return {
    backgroundColor: `color-mix(in srgb, var(--color-b-background, #faf9f6) ${Math.round(solidRatio * 100)}%, transparent)`,
    backdropFilter: blurPx > 0.5 ? `saturate(1.06) blur(${blurPx}px)` : 'none',
    WebkitBackdropFilter: blurPx > 0.5 ? `saturate(1.06) blur(${blurPx}px)` : 'none',
  }
}
