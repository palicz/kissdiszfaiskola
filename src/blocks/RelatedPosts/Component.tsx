import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { KissPostCard } from '@/components/KissPostCard'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent ? (
        <RichText
          className="prose prose-neutral mb-10 max-w-none font-sans prose-headings:font-headline prose-headings:text-b-primary prose-p:text-b-on-surface-variant md:prose-lg"
          data={introContent}
          enableGutter={false}
        />
      ) : null}

      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <KissPostCard key={doc.id ?? index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
