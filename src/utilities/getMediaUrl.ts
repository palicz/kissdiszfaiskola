import { getClientSideURL } from '@/utilities/getURL'

const PAYLOAD_MEDIA_PATH = /^\/api\/media\/file\//
const BLOB_HOST = /\.public\.blob\.vercel-storage\.com$/i

function appendCacheTag(path: string, cacheTag?: string | null): string {
  if (!cacheTag?.trim()) return path
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}v=${encodeURIComponent(cacheTag.trim())}`
}

/** Strip host from stored Payload API URLs so next/image works on every deployment. */
export function normalizeMediaUrl(url: string): string {
  if (url.startsWith('/')) {
    return url.split('?')[0] ?? url
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url)
      if (PAYLOAD_MEDIA_PATH.test(parsed.pathname)) {
        return parsed.pathname
      }
      if (BLOB_HOST.test(parsed.hostname)) {
        return url.split('?')[0] ?? url
      }
    } catch {
      return url
    }
  }

  return url
}

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const normalized = normalizeMediaUrl(url)

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return appendCacheTag(normalized, cacheTag)
  }

  if (normalized.startsWith('/')) {
    return appendCacheTag(normalized, cacheTag)
  }

  const baseUrl = getClientSideURL()
  return appendCacheTag(`${baseUrl}${normalized.startsWith('/') ? '' : '/'}${normalized}`, cacheTag)
}
