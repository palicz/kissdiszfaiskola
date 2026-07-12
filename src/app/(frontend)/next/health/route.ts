import { isVercelBlobTokenValid } from '@/utilities/vercelBlob'

export async function GET(): Promise<Response> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN

  return Response.json({
    nodeEnv: process.env.NODE_ENV,
    hasPostgresUrl: Boolean(process.env.POSTGRES_URL?.trim()),
    hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET?.trim()),
    hasBlobToken: Boolean(blobToken?.trim()),
    blobTokenFormatValid: isVercelBlobTokenValid(blobToken),
    nextPublicServerUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? null,
    vercelUrl: process.env.VERCEL_URL ?? null,
  })
}
