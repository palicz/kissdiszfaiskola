import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  const isVideo = typeof media === 'object' && Boolean(media?.mimeType?.includes('video'))

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) &&
        (isVideo ? (
          <div className="mx-auto w-full max-w-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-[0.75rem] shadow-b-ambient">
              <Media
                className="relative block h-full w-full overflow-hidden rounded-[0.75rem]"
                resource={media}
                videoClassName="h-full w-full rounded-[0.75rem] object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.75rem] shadow-b-ambient">
              <Media
                className="absolute inset-0 block h-full w-full overflow-hidden rounded-[0.75rem]"
                fill
                imgClassName={cn('rounded-[0.75rem] object-cover object-center', imgClassName)}
                pictureClassName="absolute inset-0 block h-full w-full overflow-hidden rounded-[0.75rem]"
                resource={media}
                size="(max-width: 768px) 100vw, 42rem"
                src={staticImage}
              />
            </div>
          </div>
        ))}
      {caption && (
        <div
          className={cn(
            'mt-2.5 text-left',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText
            className="text-sm leading-snug text-b-on-surface-variant [&_p]:mb-0 [&_p]:mt-0"
            data={caption}
            enableGutter={false}
            enableProse={false}
          />
        </div>
      )}
    </div>
  )
}
