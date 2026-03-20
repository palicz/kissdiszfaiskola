import type { Block } from 'payload'

export const KissLoyaltyHighlights: Block = {
  slug: 'kissLoyaltyHighlights',
  interfaceName: 'KissLoyaltyHighlightsBlock',
  labels: {
    singular: 'Kiss — Hűség / előnyök (ikonkártyák)',
    plural: 'Hűség blokkok',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      required: true,
      defaultValue: 'Hűségpont',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Bevezető',
      admin: { rows: 4 },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Kártyák',
      minRows: 1,
      labels: { singular: 'kártya', plural: 'kártyák' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ikon',
          defaultValue: 'leaf',
          options: [
            { label: 'Levél', value: 'leaf' },
            { label: 'Csillag', value: 'star' },
            { label: 'Ajándék', value: 'gift' },
            { label: 'Érme / pont', value: 'coins' },
            { label: 'Szív', value: 'heart' },
            { label: 'Jelvény', value: 'badge' },
            { label: 'Trend', value: 'trending' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Kártya címe',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Szöveg',
          admin: { rows: 4 },
        },
      ],
    },
  ],
}
