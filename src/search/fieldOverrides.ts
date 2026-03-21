import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    label: 'URL-rész (slug)',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: 'Metaadatok',
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Cím',
      },
      {
        type: 'text',
        name: 'description',
        label: 'Leírás',
      },
      {
        name: 'image',
        label: 'Kép',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: 'Kategóriák',
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'categoryID',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]
