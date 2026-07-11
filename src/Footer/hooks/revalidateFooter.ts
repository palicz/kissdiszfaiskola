import type { GlobalAfterChangeHook } from 'payload'

import { revalidateCacheTag } from '@/utilities/revalidateCacheTag'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateCacheTag('global_footer')
  }

  return doc
}
