import type { Media } from '@/payload-types'

/**
 * Payload `focalX` / `focalY`: általában 0–100 (százalék); néha 0–1.
 * CSS `object-position` + `object-fit: cover`: a kép adott %-án lévő pont a konténer ugyanazon %-ához igazodik.
 */
export function mediaObjectPositionFromResource(
  resource: Media | null | undefined,
): string | undefined {
  if (!resource || typeof resource !== 'object') return undefined
  const { focalX, focalY } = resource
  if (typeof focalX !== 'number' || typeof focalY !== 'number') return undefined

  const toPct = (n: number) => {
    if (n >= 0 && n <= 1) return n * 100
    return n
  }

  return `${toPct(focalX)}% ${toPct(focalY)}%`
}
