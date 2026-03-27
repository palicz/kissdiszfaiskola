import { loadTestEnv } from '../helpers/loadTestEnv'

loadTestEnv()

export default async function globalTeardown(): Promise<void> {
  const { cleanupTestUser } = await import('../helpers/seedUser')
  await cleanupTestUser()
}
