import { cn } from '@/utilities/ui'
import React from 'react'

import { KissPostCard, type KissPostCardData } from '@/components/KissPostCard'

export type Props = {
  posts: KissPostCardData[]
  className?: string
}

export const KissBlogArchive: React.FC<Props> = (props) => {
  const { posts, className } = props

  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="min-w-0" key={result.slug ?? index}>
                <KissPostCard className="h-full" doc={result} relationTo="posts" showCategories />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
