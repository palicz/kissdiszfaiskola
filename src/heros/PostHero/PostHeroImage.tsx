'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'
import React, { useCallback, useState } from 'react'

type Props = {
  resource: MediaType
}

/** Static layers for Suspense or no-hero fallback — matches loaded hero toning. */
export const PostHeroImageFallback: React.FC = () => (
  <div className="absolute inset-0 min-h-[min(62vh,30rem)] md:min-h-[min(80vh,52rem)]">
    <div
      aria-hidden
      className="absolute inset-0 animate-pulse bg-gradient-to-br from-b-primary-container via-b-primary to-b-primary motion-reduce:animate-none"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-b-primary via-b-primary/55 to-b-primary/20" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(255_255_255/0.08),transparent_55%)]" />
  </div>
)

/**
 * Full-bleed hero image with a branded placeholder and cross-fade when the photo finishes loading.
 */
export const PostHeroImage: React.FC<Props> = ({ resource }) => {
  const [loaded, setLoaded] = useState(false)

  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="absolute inset-0 min-h-[min(62vh,30rem)] md:min-h-[min(80vh,52rem)]">
      {/* Placeholder: matches hero toning until the real image is ready */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-b-primary-container via-b-primary to-b-primary',
          'transition-opacity duration-[900ms] ease-out motion-reduce:transition-none',
          !loaded && 'animate-pulse motion-reduce:animate-none',
          loaded && 'opacity-0',
        )}
      />

      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Media
          fill
          imgClassName="object-cover"
          priority
          resource={resource}
          size="100vw"
          onLoad={onLoad}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-b-primary via-b-primary/55 to-b-primary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(255_255_255/0.08),transparent_55%)]" />
    </div>
  )
}
