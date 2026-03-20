import type { Block } from 'payload'

export const KissOurStory: Block = {
  slug: 'kissOurStory',
  interfaceName: 'KissOurStoryBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Szekció címe',
      required: true,
      defaultValue: 'Történetünk',
      admin: {
        description: 'Pl. „Történetünk”.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Fekvő (landscape) kép',
      admin: {
        description:
          'Opcionális. Javasolt: széles, fekvő fotó (kb. 16:9 vagy 3:2); a megjelenítés levágja a kerethez igazítva.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Szövegtörzs (történet)',
      required: true,
      admin: {
        description:
          'Bekezdés a családi kertészetről, hagyományról — idézőjelek opcionálisan a szövegben.',
        rows: 8,
      },
    },
    {
      name: 'closingStatement',
      type: 'textarea',
      label: 'Záró mondat / meghívás',
      admin: {
        description: 'Dőlt, kiemelt szöveg a választóvonal alatt.',
        rows: 3,
      },
    },
    {
      name: 'signature',
      type: 'text',
      label: 'Aláírás',
      admin: {
        description: 'Pl. „Mónika és Csaba” (a kötőjel a megjelenítésben hozzáadódik).',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Címkék',
      minRows: 0,
      labels: {
        singular: 'címke',
        plural: 'címkék',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Felirat',
        },
      ],
      admin: {
        initCollapsed: true,
        description: 'Pl. „Hagyomány”, „Minőség”.',
      },
    },
  ],
  labels: {
    plural: 'Kiss — Történetünk (Rólunk)',
    singular: 'Kiss — Történetünk',
  },
}
