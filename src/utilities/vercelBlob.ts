const BLOB_TOKEN_RE = /^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i

export function isVercelBlobTokenValid(token: string | undefined): boolean {
  return BLOB_TOKEN_RE.test(token?.trim() ?? '')
}
