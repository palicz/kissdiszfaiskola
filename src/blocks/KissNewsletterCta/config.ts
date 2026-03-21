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
    {
      name: 'newsletterForm',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Payload űrlap (beküldés)',
      admin: {
        description:
          'Kötelező a működéshez: válassza a „Hírlevél feliratkozás” űrlapot (Űrlapok), vagy hozzon létre egyet legalább egy „E-mail” mezővel (blokk neve: email). A POST /next/seed (admin) létrehozza az alap űrlapot.',
      },
    },
    {
      name: 'successMessage',
      type: 'text',
      label: 'Sikeres feliratkozás szövege',
      defaultValue: 'Köszönjük a feliratkozást!',
    },
  ],
  labels: {
    plural: 'Kiss — Hírlevél / CTA blokkok',
    singular: 'Kiss — Hírlevél / CTA',
  },
}
