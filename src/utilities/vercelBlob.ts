const BLOB_TOKEN_RE = /^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i

export function getVercelBlobStoreId(token: string | undefined): string | null {
  const match = token?.trim().match(BLOB_TOKEN_RE)
  return match?.[1]?.toLowerCase() ?? null
}

export function isVercelBlobTokenValid(token: string | undefined): boolean {
  return getVercelBlobStoreId(token) !== null
}
