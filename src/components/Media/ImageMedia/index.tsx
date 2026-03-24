'use client'

import type { StaticImageData } from 'next/image'

import { ImageBox } from '@inoo-ch/payload-image-optimizer/client'
import type { MediaResource } from '@inoo-ch/payload-image-optimizer'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import type { Media as MediaType } from '@/payload-types'
import { cssVariables } from '@/cssVariables'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

function isStaticImageData(value: unknown): value is StaticImageData {
  return typeof value === 'object' && value !== null && 'src' in value
}

/** ImageBox sets `object-fit: cover` inline; override when `imgClassName` uses another Tailwind object-* fit. */
function objectFitStyleFromImgClassName(imgClassName?: string): React.CSSProperties | undefined {
  if (!imgClassName) return undefined
  if (/\bobject-contain\b/.test(imgClassName)) return { objectFit: 'contain' }
  if (/\bobject-cover\b/.test(imgClassName)) return { objectFit: 'cover' }
  if (/\bobject-fill\b/.test(imgClassName)) return { objectFit: 'fill' }
  if (/\bobject-none\b/.test(imgClassName)) return { objectFit: 'none' }
  if (/\bobject-scale-down\b/.test(imgClassName)) return { objectFit: 'scale-down' }
  return undefined
}

function toImageBoxMedia(resource: MediaType): MediaResource {
  return {
    ...resource,
    url: getMediaUrl(resource.url, resource.updatedAt) || resource.url || undefined,
    updatedAt: undefined,
  }
}

/**
 * ImageMedia
 *
 * Payload uploads render via `ImageBox` (ThumbHash blur, focal point, cache-friendly URLs).
 * Static imports and bare URL strings still use `next/image` / `ImageBox` with a string `media` URL.
 */
export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    onLoad,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  const fitStyle = objectFitStyleFromImgClassName(imgClassName)

  // Static import (e.g. MediaBlock `staticImage`) — not a Payload document
  if (isStaticImageData(srcFromProps)) {
    const src = srcFromProps
    const hasBlur = Boolean(src.blurDataURL)

    return (
      <div className={cn(pictureClassName)}>
        <NextImage
          alt={altFromProps || ''}
          className={cn(imgClassName)}
          fill={fill}
          height={!fill ? src.height : undefined}
          placeholder={hasBlur ? 'blur' : 'empty'}
          blurDataURL={src.blurDataURL}
          priority={priority}
          quality={100}
          loading={loading}
          onLoad={onLoad}
          sizes={sizes}
          src={src}
          width={!fill ? src.width : undefined}
        />
      </div>
    )
  }

  // Payload media — ImageBox + ThumbHash / focal point from the image optimizer plugin
  if (resource && typeof resource === 'object') {
    const alt = altFromProps || resource.alt || ''

    return (
      <div className={cn(pictureClassName)}>
        <ImageBox
          media={toImageBoxMedia(resource as MediaType)}
          alt={alt || ''}
          className={cn(imgClassName)}
          fill={fill}
          loading={loading}
          priority={priority}
          sizes={sizes}
          style={fitStyle}
          onLoad={onLoad}
        />
      </div>
    )
  }

  // String URL only (no Payload `resource`)
  let src: string = typeof srcFromProps === 'string' ? srcFromProps : ''
  if (src && !src.startsWith('http://') && !src.startsWith('https://')) {
    src = getMediaUrl(src)
  }

  return (
    <div className={cn(pictureClassName)}>
      <ImageBox
        media={src}
        alt={altFromProps || ''}
        className={cn(imgClassName)}
        fill={fill}
        loading={loading}
        priority={priority}
        sizes={sizes}
        style={fitStyle}
        onLoad={onLoad}
      />
    </div>
  )
}
