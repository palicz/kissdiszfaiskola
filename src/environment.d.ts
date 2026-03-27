declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string
      PAYLOAD_SECRET: string
      NEXT_PUBLIC_SERVER_URL: string
      BLOB_READ_WRITE_TOKEN?: string
      CRON_SECRET?: string
      PREVIEW_SECRET?: string
      /** Shared secret for POST/DELETE `/api/e2e-test-user` (local e2e only; optional in prod). */
      E2E_SETUP_SECRET?: string
      VERCEL_URL?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
    }
  }
}

export {}
