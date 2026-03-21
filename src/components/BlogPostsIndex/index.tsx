import { KissBlogArchive } from '@/components/KissBlogArchive'
import type { KissPostCardData } from '@/components/KissPostCard'
import { Pagination } from '@/components/Pagination'
import React from 'react'

function HuPostRange({
  currentPage,
  limit,
  totalDocs,
}: {
  currentPage?: number
  limit?: number
  totalDocs?: number
}) {
  if (typeof totalDocs === 'undefined' || totalDocs === 0) {
    return (
      <p className="font-sans text-sm text-b-on-surface-variant">Nincs megjeleníthető bejegyzés.</p>
    )
  }

  const page = currentPage ?? 1
  const perPage = limit ?? 12
  let indexStart = (page - 1) * perPage + 1
  if (indexStart > totalDocs) indexStart = 0
  let indexEnd = page * perPage
  if (indexEnd > totalDocs) indexEnd = totalDocs

  return (
    <p className="font-sans text-sm text-b-on-surface-variant">
      Megjelenítve: {indexStart > 0 ? `${indexStart}–${indexEnd}` : '0'} / {totalDocs} bejegyzés
    </p>
  )
}

export const BlogPostsIndex: React.FC<{
  posts: KissPostCardData[]
  currentPage: number
  totalPages: number
  totalDocs: number
  limit: number
}> = ({ posts, currentPage, totalPages, totalDocs, limit }) => {
  return (
    <>
      <section className="bg-b-primary px-4 pt-28 pb-14 md:px-6 md:pt-32 md:pb-16 lg:px-8">
        <div className="container">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-b-on-primary/70">
            Kiss Díszfaiskola
          </p>
          <h1 className="max-w-3xl font-headline text-4xl leading-[1.1] text-b-on-primary editorial-spacing md:text-5xl lg:text-[3.5rem]">
            Blog
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-b-on-primary/80 md:text-lg">
            Hírek, ültetési és gondozási ötletek — közvetlenül a termelőtől, három évtizedes
            tapasztalattal.
          </p>
        </div>
      </section>

      <section className="bg-b-surface px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="container mb-10">
          <HuPostRange currentPage={currentPage} limit={limit} totalDocs={totalDocs} />
        </div>

        <KissBlogArchive className="container" posts={posts} />

        {totalPages > 1 && currentPage ? (
          <div className="container">
            <Pagination page={currentPage} totalPages={totalPages} />
          </div>
        ) : null}
      </section>
    </>
  )
}
