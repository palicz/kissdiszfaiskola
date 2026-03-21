import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Fejléc',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globális tartalom',
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Oldal neve (fejléc)',
      defaultValue: 'Kiss Díszfaiskola',
      admin: {
        description:
          'A logó helyén megjelenő szöveg. A valódi logókép később cserélhető komponensben.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'itemType',
          type: 'radio',
          label: 'Típus',
          defaultValue: 'link',
          options: [
            { label: 'Egy link', value: 'link' },
            { label: 'Lenyíló menü', value: 'dropdown' },
          ],
          admin: {
            layout: 'horizontal',
            description:
              'A lenyíló menüvel több kapcsolódó oldalt (pl. Blog, ajándékutalvány) egy helyre csoportosíthatsz.',
          },
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_data, siblingData) => siblingData?.itemType !== 'dropdown',
            },
          },
        }),
        {
          name: 'dropdownLabel',
          type: 'text',
          label: 'Menü felirat',
          admin: {
            condition: (_data, siblingData) => siblingData?.itemType === 'dropdown',
            description: 'A fejlécben látható szöveg (pl. Továbbiak, Szolgáltatások).',
          },
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Menüpontok',
          minRows: 1,
          maxRows: 12,
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.itemType === 'dropdown',
            initCollapsed: true,
          },
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
