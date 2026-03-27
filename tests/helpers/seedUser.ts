import { e2eTestUser as testUser } from '@/constants/e2eTestUser'

export { testUser }

const baseURL = () => process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

function requireSecret(): string {
  const secret = process.env.E2E_SETUP_SECRET
  if (!secret) {
    throw new Error(
      'E2E_SETUP_SECRET must be set (e.g. in .env.local) to run admin e2e tests. See tests/README.md.',
    )
  }
  return secret
}

/**
 * Seeds the e2e user via the Next.js API route (runs Payload in the app process).
 */
export async function seedTestUser(): Promise<void> {
  const secret = requireSecret()
  const res = await fetch(`${baseURL()}/api/e2e-test-user`, {
    method: 'POST',
    headers: { 'x-e2e-setup-secret': secret },
  })
  if (!res.ok) {
    throw new Error(`e2e seed failed: ${res.status} ${await res.text()}`)
  }
}

export async function cleanupTestUser(): Promise<void> {
  const secret = requireSecret()
  const res = await fetch(`${baseURL()}/api/e2e-test-user`, {
    method: 'DELETE',
    headers: { 'x-e2e-setup-secret': secret },
  })
  if (!res.ok) {
    throw new Error(`e2e cleanup failed: ${res.status} ${await res.text()}`)
  }
}
