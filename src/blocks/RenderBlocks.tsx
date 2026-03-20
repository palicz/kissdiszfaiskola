import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { KissGalleryBlock } from '@/blocks/KissGallery/Component'
import { KissNewsletterBlock } from '@/blocks/KissNewsletterCta/Component'
import { KissOurStoryBlock } from '@/blocks/KissOurStory/Component'
import { KissPlantCatalogBlock } from '@/blocks/KissPlantCatalog/Component'
import { KissSpecimenBlock } from '@/blocks/KissSpecimenShowcase/Component'
import { KissVisitBlock } from '@/blocks/KissVisitContact/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  kissNewsletter: KissNewsletterBlock,
  kissOurStory: KissOurStoryBlock,
  kissPlantCatalog: KissPlantCatalogBlock,
  kissGallery: KissGalleryBlock,
  kissSpecimen: KissSpecimenBlock,
  kissVisit: KissVisitBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={blockType?.startsWith('kiss') ? 'my-0' : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
