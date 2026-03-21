import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: 'Oszlopszélesség',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'Harmad',
        value: 'oneThird',
      },
      {
        label: 'Fél',
        value: 'half',
      },
      {
        label: 'Kétharmad',
        value: 'twoThirds',
      },
      {
        label: 'Teljes szélesség',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    plural: 'Többoszlopos tartalom blokkok',
    singular: 'Többoszlopos tartalom',
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Oszlopok',
      labels: {
        plural: 'oszlopok',
        singular: 'oszlop',
      },
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
