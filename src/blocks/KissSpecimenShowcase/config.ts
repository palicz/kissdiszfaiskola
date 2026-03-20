import type { Block } from 'payload'

import { link } from '@/fields/link'

export const KissSpecimenShowcase: Block = {
  slug: 'kissSpecimen',
  interfaceName: 'KissSpecimenBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Szekció felirat',
    },
    {
      name: 'titleLine1',
      type: 'text',
      label: 'Cím 1. sor',
      required: true,
    },
    {
      name: 'titleLine2',
      type: 'text',
      label: 'Cím 2. sor (dőlt)',
    },
    link({
      appearances: false,
      overrides: {
        name: 'listLink',
        label: '„Összes megtekintése” link',
        admin: {
          description: 'Opcionális link a katalógushoz vagy galériához.',
        },
      },
    }),
    {
      name: 'featureImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Nagy feature kép',
    },
    {
      name: 'featureBadge',
      type: 'text',
      label: 'Feature jelvény szöveg',
    },
    {
      name: 'featureTitleLine1',
      type: 'text',
      label: 'Feature cím 1. sor',
    },
    {
      name: 'featureTitleLine2',
      type: 'text',
      label: 'Feature cím 2. sor',
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Oldalsó kép (16:9)',
    },
    {
      name: 'sideCardLabel',
      type: 'text',
      label: 'Mobil 2. kártya felirat',
      admin: {
        description:
          'Kis nagybetűs címke a második „bento” kártyán (pl. „Örökzöldek”). Csak keskeny kijelzőn.',
      },
    },
    {
      name: 'cardTitle',
      type: 'text',
      label: 'Kártya cím',
    },
    {
      name: 'cardDescription',
      type: 'textarea',
      label: 'Kártya szöveg',
    },
    link({
      appearances: false,
      overrides: {
        name: 'cardLink',
        label: 'Kártya „Részletek” link',
      },
    }),
  ],
  labels: {
    plural: 'Kiss — Növényválogatás blokkok',
    singular: 'Kiss — Növényválogatás',
  },
}
