import type { Block } from 'payload'

export const KissSplitFeature: Block = {
  slug: 'kissSplitFeature',
  interfaceName: 'KissSplitFeatureBlock',
  labels: {
    singular: 'Kiss — Szöveg + kép (kéthasáb)',
    plural: 'Split szöveg+kép blokkok',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Felső sor (kis szöveg)',
      admin: {
        description: 'Opcionális, pl. kategória vagy rövid címke.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      required: true,
    },
    {
      name: 'showTitleRule',
      type: 'checkbox',
      label: 'Cím alá zöld vonal',
      defaultValue: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Bevezető',
      admin: { rows: 3 },
    },
    {
      name: 'bulletItems',
      type: 'array',
      label: 'Felsorolás (pontok)',
      minRows: 1,
      labels: { singular: 'pont', plural: 'pontok' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Szöveg',
          required: true,
          admin: { rows: 2 },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kép',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Kép oldala (asztal)',
      defaultValue: 'right',
      options: [
        { label: 'Jobbra (szöveg balra)', value: 'right' },
        { label: 'Balra (szöveg jobbra)', value: 'left' },
      ],
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Kép alt szöveg',
      admin: {
        description: 'Akadálymentesség; ha üres, a media alt mezője jön.',
      },
    },
  ],
}
