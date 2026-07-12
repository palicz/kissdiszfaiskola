export async function GET(): Promise<Response> {
  return Response.json({
    nodeEnv: process.env.NODE_ENV,
    hasPostgresUrl: Boolean(process.env.POSTGRES_URL?.trim()),
    hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET?.trim()),
    hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()),
    nextPublicServerUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? null,
    vercelUrl: process.env.VERCEL_URL ?? null,
  })
}
