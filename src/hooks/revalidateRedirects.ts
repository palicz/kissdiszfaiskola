import type { CollectionAfterChangeHook } from 'payload'

import { revalidateCacheTag } from '@/utilities/revalidateCacheTag'

export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)

    revalidateCacheTag('redirects')
  }

  return doc
}
