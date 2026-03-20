import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'aboutText',
      type: 'textarea',
      label: 'Bemutatkozás',
      admin: {
        description: 'Rövid szöveg a lábrész első oszlopában.',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Cím',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mail',
    },
    {
      name: 'copyrightLine',
      type: 'text',
      label: 'Szerzői jog / © sor',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Alsó szlogén sor',
      admin: {
        description: 'A lábléc legalján megjelenő rövid mondat (opcionális).',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Közösségi profilok',
      maxRows: 2,
      admin: {
        description:
          'Legfeljebb két link (pl. Facebook, Instagram). Csak akkor jelenik meg a láblécben, ha az URL meg van adva.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            description: 'Teljes cím, pl. https://www.facebook.com/...',
          },
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
