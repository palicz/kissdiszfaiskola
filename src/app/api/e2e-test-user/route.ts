import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { e2eTestUser } from '@/constants/e2eTestUser'

function unauthorized(): Response {
  return new Response(null, { status: 404 })
}

function forbidden(): Response {
  return new Response(null, { status: 403 })
}

function validateRequest(req: Request): boolean {
  const expected = process.env.E2E_SETUP_SECRET
  if (!expected) return false
  const provided = req.headers.get('x-e2e-setup-secret')
  return provided === expected
}

/**
 * E2E-only: create or replace the test admin user. Requires E2E_SETUP_SECRET and matching header.
 * Disabled when E2E_SETUP_SECRET is unset (returns 404).
 */
export async function POST(req: Request): Promise<Response> {
  if (!process.env.E2E_SETUP_SECRET) return unauthorized()
  if (!validateRequest(req)) return forbidden()

  const payload = await getPayload({ config: configPromise })

  await payload.delete({
    collection: 'users',
    where: { email: { equals: e2eTestUser.email } },
    overrideAccess: true,
  })

  await payload.create({
    collection: 'users',
    data: {
      email: e2eTestUser.email,
      password: e2eTestUser.password,
      name: e2eTestUser.name,
    },
    overrideAccess: true,
  })

  return Response.json({ ok: true })
}

/**
 * E2E-only: remove the test user.
 */
export async function DELETE(req: Request): Promise<Response> {
  if (!process.env.E2E_SETUP_SECRET) return unauthorized()
  if (!validateRequest(req)) return forbidden()

  const payload = await getPayload({ config: configPromise })

  await payload.delete({
    collection: 'users',
    where: { email: { equals: e2eTestUser.email } },
    overrideAccess: true,
  })

  return Response.json({ ok: true })
}
