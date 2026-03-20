import type { Block } from 'payload'

export const KissNewsletterCta: Block = {
  slug: 'kissNewsletter',
  interfaceName: 'KissNewsletterBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Szöveg',
      required: true,
    },
    {
      name: 'emailPlaceholder',
      type: 'text',
      label: 'E-mail mező helyfoglaló',
      defaultValue: 'AZ ÖN E-MAIL CÍME',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Gomb felirata',
      defaultValue: 'Feliratkozás',
    },
    {
      name: 'privacyNote',
      type: 'textarea',
      label: 'Szöveg az űrlap alatt (biztonság, leiratkozás)',
      admin: {
        description: 'Rövid tájékoztató: adatkezelés, leiratkozás. Üresen hagyható.',
      },
      defaultValue:
        'Az e-mail-címét bizalmasan kezeljük, harmadik félnek nem adjuk át. A hírlevélről bármikor, könnyen leiratkozhat.',
    },
  ],
  labels: {
    plural: 'Kiss — Hírlevél / CTA blokkok',
    singular: 'Kiss — Hírlevél / CTA',
  },
}
