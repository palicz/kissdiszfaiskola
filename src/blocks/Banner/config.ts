import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Stílus',
      defaultValue: 'info',
      options: [
        { label: 'Tájékoztató', value: 'info' },
        { label: 'Figyelmeztetés', value: 'warning' },
        { label: 'Hiba', value: 'error' },
        { label: 'Siker', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
  labels: {
    plural: 'Szalagcím (banner) blokkok',
    singular: 'Szalagcím (banner)',
  },
}
