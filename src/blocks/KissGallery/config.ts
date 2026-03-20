import type { Block } from 'payload'

export const KissGallery: Block = {
  slug: 'kissGallery',
  interfaceName: 'KissGalleryBlock',
  labels: {
    singular: 'Galéria (képek + feliratok)',
    plural: 'Galéria blokkok',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      required: true,
      defaultValue: 'Galéria',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Bevezető szöveg',
      admin: {
        rows: 4,
        description:
          'A cím alá kerül. Mobil: 2 oszlop, asztal: 4 oszlop. Kattintásra kinagyítás; bezárás: X, háttérre kattintva vagy Escape.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Galéria elemek',
      minRows: 1,
      labels: { singular: 'elem', plural: 'elemek' },
      admin: {
        description: 'Minden elemhez egy kép (media) és a kép alá kerülő felirat kötelező.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Kép',
        },
        {
          name: 'caption',
          type: 'text',
          required: true,
          label: 'Felirat',
          admin: {
            description: 'Pl. növényfaj név — a kép alatt, középen.',
          },
        },
      ],
    },
  ],
}
