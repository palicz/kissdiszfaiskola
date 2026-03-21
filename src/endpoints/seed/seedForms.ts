import type { Payload } from 'payload'

import { lexicalThankYou } from './lexicalThankYou'

/**
 * Creates default Payload Form Builder documents if missing (by title).
 * Run via POST /next/seed (admin) or import `seed` from this package in tests.
 */
export async function seedForms(payload: Payload): Promise<void> {
  const newsletter = await payload.find({
    collection: 'forms',
    limit: 1,
    pagination: false,
    where: {
      title: {
        equals: 'Hírlevél feliratkozás',
      },
    },
  })

  if (newsletter.totalDocs === 0) {
    await payload.create({
      collection: 'forms',
      data: {
        title: 'Hírlevél feliratkozás',
        submitButtonLabel: 'Feliratkozás',
        confirmationType: 'message',
        confirmationMessage: lexicalThankYou('Köszönjük a feliratkozást!'),
        fields: [
          {
            blockType: 'email',
            name: 'email',
            label: 'E-mail cím',
            required: true,
          },
        ],
      },
      overrideAccess: true,
    })
  }

  const contact = await payload.find({
    collection: 'forms',
    limit: 1,
    pagination: false,
    where: {
      title: {
        equals: 'Kapcsolatfelvétel',
      },
    },
  })

  if (contact.totalDocs === 0) {
    await payload.create({
      collection: 'forms',
      data: {
        title: 'Kapcsolatfelvétel',
        submitButtonLabel: 'Üzenet küldése',
        confirmationType: 'message',
        confirmationMessage: lexicalThankYou(
          'Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.',
        ),
        fields: [
          {
            blockType: 'text',
            name: 'name',
            label: 'Név',
            required: true,
          },
          {
            blockType: 'email',
            name: 'email',
            label: 'E-mail cím',
            required: true,
          },
          {
            blockType: 'textarea',
            name: 'message',
            label: 'Üzenet',
            required: true,
          },
        ],
      },
      overrideAccess: true,
    })
  }
}
