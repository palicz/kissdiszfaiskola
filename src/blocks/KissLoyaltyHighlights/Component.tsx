'use client'

import type { KissLoyaltyHighlightsBlock as KissLoyaltyHighlightsBlockProps } from '@/payload-types'
import { Badge, Coins, Gift, Heart, Leaf, Star, TrendingUp } from 'lucide-react'
import React from 'react'

const iconMap = {
  leaf: Leaf,
  star: Star,
  gift: Gift,
  coins: Coins,
  heart: Heart,
  badge: Badge,
  trending: TrendingUp,
} as const

type IconKey = keyof typeof iconMap

export const KissLoyaltyHighlightsBlock: React.FC<
  KissLoyaltyHighlightsBlockProps & { disableInnerContainer?: boolean }
> = (props) => {
  const { disableInnerContainer: _ignored, title, intro, items } = props
  const rows = items?.filter((r) => r?.heading?.trim()) ?? []

  return (
    <section className="bg-b-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
        <header className="mb-10 max-w-3xl md:mb-12">
          <h2 className="font-headline text-3xl font-medium text-b-primary md:text-4xl">{title}</h2>
          {intro?.trim() ? (
            <p className="mt-4 text-base leading-relaxed text-b-on-surface-variant md:text-lg">
              {intro.trim()}
            </p>
          ) : null}
        </header>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, i) => {
            const key = (row.icon ?? 'leaf') as IconKey
            const Icon = iconMap[key in iconMap ? key : 'leaf']
            return (
              <li
                className="flex flex-col rounded-xl border border-b-outline-variant/30 bg-b-surface-container-low p-6 shadow-sm shadow-b-primary/5 transition hover:border-b-primary/25"
                key={row.id ?? i}
              >
                <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-b-primary/10 text-b-primary">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-headline text-lg font-medium text-b-primary">
                  {row.heading!.trim()}
                </h3>
                {row.description?.trim() ? (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-b-on-surface-variant md:text-base">
                    {row.description.trim()}
                  </p>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
