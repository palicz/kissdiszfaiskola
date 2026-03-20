'use client'

import { cn } from '@/utilities/ui'
import type { KissCalloutBlock as KissCalloutBlockProps } from '@/payload-types'
import { AlertCircle, Info, Sparkles } from 'lucide-react'
import React from 'react'

const toneStyles = {
  info: {
    wrap: 'border border-b-outline-variant/50 bg-b-surface-container-low',
    icon: 'text-b-primary',
    Icon: Info,
  },
  tip: {
    wrap: 'border border-b-outline-variant/50 bg-b-secondary-container/25',
    icon: 'text-b-secondary',
    Icon: Sparkles,
  },
  important: {
    wrap: 'border border-b-outline-variant/55 bg-b-surface-container-high',
    icon: 'text-b-tertiary',
    Icon: AlertCircle,
  },
} as const

export const KissCalloutBlock: React.FC<
  KissCalloutBlockProps & { disableInnerContainer?: boolean }
> = (props) => {
  const { disableInnerContainer: _ignored, tone, title, body, linkLabel, linkUrl } = props
  const bodyText = body?.trim()
  if (!bodyText) return null

  const t = tone && tone in toneStyles ? tone : 'info'
  const { wrap, icon, Icon } = toneStyles[t as keyof typeof toneStyles]

  const href = linkUrl?.trim()
  const showLink = Boolean(href && linkLabel?.trim())

  return (
    <section className="bg-b-background py-6 md:py-8">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
        <div className={cn('flex gap-4 rounded-xl p-5 md:p-6', wrap)}>
          <span className={cn('mt-0.5 shrink-0', icon)} aria-hidden>
            <Icon className="size-6 md:size-7" strokeWidth={1.6} />
          </span>
          <div className="min-w-0 flex-1">
            {title?.trim() ? (
              <h3 className="font-headline text-lg font-medium text-b-primary md:text-xl">
                {title.trim()}
              </h3>
            ) : null}
            <p
              className={cn(
                'whitespace-pre-line text-base leading-relaxed text-b-on-surface',
                title?.trim() && 'mt-2',
              )}
            >
              {bodyText}
            </p>
            {showLink ? (
              <p className="mt-4">
                <a
                  className="font-sans text-sm font-medium text-b-tertiary underline decoration-b-tertiary/40 underline-offset-4 transition hover:decoration-b-tertiary"
                  href={href!}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {linkLabel!.trim()}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
