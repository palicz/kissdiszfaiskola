import type { Block } from 'payload'

export const KissCallout: Block = {
  slug: 'kissCallout',
  interfaceName: 'KissCalloutBlock',
  labels: {
    singular: 'Kiss — Kiemelő (tipp / figyelem)',
    plural: 'Kiemelő blokkok',
  },
  fields: [
    {
      name: 'tone',
      type: 'select',
      label: 'Hangnem',
      defaultValue: 'info',
      options: [
        { label: 'Tájékoztató (semleges)', value: 'info' },
        { label: 'Tipp / jó tudni', value: 'tip' },
        { label: 'Fontos / figyelem', value: 'important' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      admin: {
        description: 'Opcionális rövid cím a szöveg felett.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Szöveg',
      required: true,
      admin: { rows: 5 },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Link felirat',
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Link URL',
      admin: {
        description: 'Teljes URL (https://…). Ha üres, a link nem jelenik meg.',
      },
    },
  ],
}
