import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const KissBlogPosts: Block = {
  slug: 'kissBlogPosts',
  interfaceName: 'KissBlogPostsBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Felső sor (opcionális)',
      admin: {
        description: 'Rövid, kis betűs sor a cím felett (pl. „Blog”).',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Cím',
      admin: {
        description: 'Ha üres, csak a bevezető és a bejegyzések jelennek meg.',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Bevezető szöveg',
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Tartalom forrása',
      defaultValue: 'collection',
      options: [
        {
          label: 'Gyűjtemény alapján',
          value: 'collection',
        },
        {
          label: 'Egyedi kiválasztás',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Megjelenítendő gyűjtemény',
      options: [
        {
          label: 'Bejegyzések',
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Szűrés kategóriák szerint',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 6,
      label: 'Elemek száma',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Kiválasztott bejegyzések',
      relationTo: ['posts'],
    },
  ],
  labels: {
    plural: 'Kiss — Blog / bejegyzések blokkok',
    singular: 'Kiss — Blog / bejegyzések',
  },
}
