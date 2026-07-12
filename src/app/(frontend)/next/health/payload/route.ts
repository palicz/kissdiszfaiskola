import { getPayload } from 'payload'
import config from '@payload-config'

import { getVercelBlobStoreId, isVercelBlobTokenValid } from '@/utilities/vercelBlob'

const DEFAULT_PROBE_FILENAME = 'img1.webp'

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function getBlobUrl(storeId: string, filename: string): string {
  return `https://${storeId}.public.blob.vercel-storage.com/${encodeURIComponent(filename)}`
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')?.trim() || DEFAULT_PROBE_FILENAME
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN
  const blobStoreId = getVercelBlobStoreId(blobToken)

  const result: Record<string, unknown> = {
    filename,
    blobTokenFormatValid: isVercelBlobTokenValid(blobToken),
    blobStorageEnabled: isVercelBlobTokenValid(blobToken),
    blobStoreId,
    payloadBoot: {
      ok: false,
      error: null as string | null,
    },
    media: {
      found: false,
      id: null as string | number | null,
      filename: null as string | null,
      url: null as string | null,
    },
    blobHead: {
      skipped: true,
      ok: false,
      url: null as string | null,
      status: null as number | null,
      error: null as string | null,
    },
  }

  try {
    const payload = await getPayload({ config: await config })
    result.payloadBoot = { ok: true, error: null }

    const { docs } = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        filename: {
          equals: filename,
        },
      },
    })

    const doc = docs[0]
    if (doc) {
      result.media = {
        found: true,
        id: doc.id,
        filename: doc.filename ?? null,
        url: doc.url ?? null,
      }
    }

    if (blobStoreId && doc?.filename) {
      const blobUrl = getBlobUrl(blobStoreId, doc.filename)

      result.blobHead = {
        skipped: false,
        ok: false,
        url: blobUrl,
        status: null,
        error: null,
      }

      try {
        const response = await fetch(blobUrl, { method: 'HEAD' })
        result.blobHead = {
          skipped: false,
          ok: response.ok,
          url: blobUrl,
          status: response.status,
          error: response.ok ? null : `${response.status} ${response.statusText}`,
        }
      } catch (error) {
        result.blobHead = {
          skipped: false,
          ok: false,
          url: blobUrl,
          status: null,
          error: errorMessage(error),
        }
      }
    }
  } catch (error) {
    result.payloadBoot = {
      ok: false,
      error: errorMessage(error),
    }
  }

  const payloadBootOk = (result.payloadBoot as { ok: boolean }).ok
  const mediaFound = (result.media as { found: boolean }).found
  const blobHead = result.blobHead as {
    skipped: boolean
    ok: boolean
  }
  const ok = Boolean(payloadBootOk && (!mediaFound || blobHead.skipped || blobHead.ok))

  return Response.json({ ok, ...result }, { status: ok ? 200 : 503 })
}
