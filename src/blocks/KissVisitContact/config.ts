import type { Block } from 'payload'

export const KissVisitContact: Block = {
  slug: 'kissVisit',
  interfaceName: 'KissVisitBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Szekció cím',
      required: true,
      admin: {
        description: 'Pl. „Látogasson el hozzánk”.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kép (négyzetes)',
    },
    {
      name: 'statNumber',
      type: 'text',
      label: 'Statisztika szám',
      admin: {
        description: 'Pl. „30+”.',
      },
    },
    {
      name: 'statLabel',
      type: 'text',
      label: 'Statisztika felirat',
    },
    {
      name: 'hoursHeading',
      type: 'text',
      label: 'Nyitvatartás blokk címe',
      defaultValue: 'Nyitvatartás',
    },
    {
      name: 'hoursRows',
      type: 'array',
      label: 'Nyitvatartás sorok',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'muted',
          type: 'checkbox',
          label: 'Visszafogott megjelenés (pl. zárva)',
          defaultValue: false,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'contactHeading',
      type: 'text',
      label: 'Kapcsolat blokk címe',
      defaultValue: 'Kapcsolat',
    },
    {
      name: 'addressTitle',
      type: 'text',
      label: 'Cím rövid megnevezés',
    },
    {
      name: 'addressLines',
      type: 'textarea',
      label: 'Cím (több sor)',
    },
  ],
  labels: {
    plural: 'Kiss — Látogatás és nyitvatartás',
    singular: 'Kiss — Látogatás',
  },
}
