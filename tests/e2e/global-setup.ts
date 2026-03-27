import { loadTestEnv } from '../helpers/loadTestEnv'

loadTestEnv()

export default async function globalSetup(): Promise<void> {
  const { seedTestUser } = await import('../helpers/seedUser')
  await seedTestUser()
}
