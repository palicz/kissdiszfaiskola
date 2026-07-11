import type { GlobalAfterChangeHook } from 'payload'

import { revalidateCacheTag } from '@/utilities/revalidateCacheTag'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateCacheTag('global_header')
  }

  return doc
}
