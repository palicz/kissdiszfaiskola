import type { Block } from 'payload'

export const KissContactDetails: Block = {
  slug: 'kissContactDetails',
  interfaceName: 'KissContactDetailsBlock',
  labels: {
    singular: 'Kapcsolat — elérhetőség, képek, térkép',
    plural: 'Kapcsolat blokkok',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      required: true,
      defaultValue: 'Elérhetőség',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Bevezető',
      admin: {
        rows: 3,
        description: 'Opcionális rövid szöveg a cím alatt.',
      },
    },
    {
      name: 'phones',
      type: 'array',
      label: 'Telefonszámok',
      labels: { singular: 'szám', plural: 'számok' },
      admin: {
        description:
          'Több szám is megadható (pl. mobil + üzlet). Opcionális címke: „Mobil”, „Fő vonal”.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Címke',
          admin: {
            description: 'Pl. „Mobil” — üresen egyetlen „Telefon” blokkban jelenik meg.',
          },
        },
        {
          name: 'number',
          type: 'text',
          label: 'Szám',
          required: true,
          admin: {
            description: 'Pl. +36 30 123 4567 — kattintható hívás link.',
          },
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mail',
    },
    {
      name: 'addressLabel',
      type: 'text',
      label: 'Cím megnevezés',
      admin: {
        description: 'Pl. „Telephely” vagy üresen hagyható.',
      },
    },
    {
      name: 'addressLines',
      type: 'textarea',
      label: 'Cím (több sor)',
      admin: {
        rows: 4,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Képek',
      labels: { singular: 'kép', plural: 'képek' },
      admin: {
        description: 'Opcionális fotók (pl. bejárat, tábla).',
        initCollapsed: true,
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
          label: 'Felirat',
        },
      ],
    },
    {
      name: 'mapHeading',
      type: 'text',
      label: 'Térkép blokk címe',
      defaultValue: 'Térkép',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Beágyazott térkép URL (Google)',
      admin: {
        description:
          'Google Térkép → Megosztás → Térkép beágyazása → másold ki csak az iframe „src” címét (https://www.google.com/maps/embed?...).',
      },
    },
  ],
}
