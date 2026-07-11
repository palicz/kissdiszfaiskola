import { revalidateTag } from 'next/cache'

export function revalidateCacheTag(tag: string) {
  revalidateTag(tag, { expire: 0 })
}
