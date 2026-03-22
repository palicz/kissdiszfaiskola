import type { Media } from '@/payload-types'

/** A diavetítő konténer aránya — egyezik a Tailwind `aspect-video` (16/9) osztállyal. */
export const SLIDESHOW_CONTAINER_ASPECT = 16 / 9

/**
 * A `FolderSlideshow` nézet `aspect-video` (16:9) — a JS döntésnek egyeznie kell vele.
 */
export function getSlideshowContainerAspect(): number {
  return SLIDESHOW_CONTAINER_ASPECT
}

export function mediaHasFocalPoint(resource: Media): boolean {
  return typeof resource.focalX === 'number' && typeof resource.focalY === 'number'
}

/**
 * Ha a kép aránya „magasabb”, mint a 16:9 sáv, az `object-cover` erősen levág.
 * Ilyenkor `object-contain` + háttérszín. Fókuszpont beállításakor mindig `cover`.
 */
export function getSlideshowObjectFit(
  resource: Media,
  containerAspect: number,
): 'contain' | 'cover' {
  if (mediaHasFocalPoint(resource)) return 'cover'
  const w = resource.width
  const h = resource.height
  if (!w || !h) return 'cover'
  const imgAspect = w / h
  if (imgAspect < containerAspect) return 'contain'
  return 'cover'
}
