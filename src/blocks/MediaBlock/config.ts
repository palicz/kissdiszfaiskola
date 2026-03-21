import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    plural: 'Média blokkok',
    singular: 'Média blokk',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: 'Médiafájl',
      relationTo: 'media',
      required: true,
    },
  ],
}
