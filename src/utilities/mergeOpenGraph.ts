import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

import { getServerSideURL } from './getURL'

/** Alap OG — a default képet az `opengraph-image.tsx` szolgálja ki (`/opengraph-image`). */
const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_DESCRIPTION,
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  const defaultImageUrl = `${getServerSideURL()}/opengraph-image`
  const raw = og?.images
  const fromOg = raw == null ? [] : Array.isArray(raw) ? raw : [raw]

  return {
    ...defaultOpenGraph,
    ...og,
    images:
      fromOg.length > 0
        ? fromOg
        : [{ url: defaultImageUrl, width: 1200, height: 630, alt: SITE_NAME }],
  }
}
