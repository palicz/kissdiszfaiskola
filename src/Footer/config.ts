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
      name: 'legalLinks',
      type: 'array',
      label: 'Jogi linkek',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
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
