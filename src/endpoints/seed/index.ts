import type { Payload } from 'payload'
import type { PayloadRequest } from 'payload'

import { seedForms } from './seedForms'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
}

/**
 * Minimal seed: default Form Builder documents (hírlevél, kapcsolat).
 * Extend here if you add more bootstrap data.
 */
export async function seed({ payload }: SeedArgs): Promise<void> {
  await seedForms(payload)
}
