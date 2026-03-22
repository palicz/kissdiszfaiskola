import configPromise from '@payload-config'
import type { KissFolderSlideshowBlock } from '@/payload-types'
import { getPayload } from 'payload'

import { FolderSlideshowClient } from './FolderSlideshowClient'

function folderIdFromField(folder: KissFolderSlideshowBlock['folder']): number | null {
  if (folder == null) return null
  if (typeof folder === 'object' && folder !== null && 'id' in folder) return folder.id
  if (typeof folder === 'number') return folder
  return null
}

export async function KissFolderSlideshowBlock(
  props: KissFolderSlideshowBlock & { disableInnerContainer?: boolean },
) {
  const { folder, transition, intervalMs, eyebrow, title } = props
  const id = folderIdFromField(folder)
  if (id == null) return null

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 50,
    sort: 'createdAt',
    where: {
      and: [{ folder: { equals: id } }, { mimeType: { contains: 'image' } }],
    },
  })

  const media = result.docs

  if (media.length === 0) {
    return (
      <section className="bg-b-surface-container-low py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 lg:px-10 xl:px-12">
          {title ? (
            <h2 className="font-headline text-2xl text-b-primary md:text-3xl">{title}</h2>
          ) : null}
          <p className="mt-4 text-b-on-surface-variant">
            Nincs kép ebben a mappában. Tölts fel képeket a média adminban ebbe a mappába.
          </p>
        </div>
      </section>
    )
  }

  return (
    <FolderSlideshowClient
      eyebrow={eyebrow}
      intervalMs={intervalMs}
      media={media}
      title={title}
      transition={transition}
    />
  )
}
