import type { Block } from 'payload'

export const KissFolderSlideshow: Block = {
  slug: 'kissFolderSlideshow',
  interfaceName: 'KissFolderSlideshowBlock',
  labels: {
    singular: 'Diavetítés (mappa)',
    plural: 'Diavetítés blokkok',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Fejléc (kis szöveg)',
      admin: {
        description: 'Opcionális, a cím fölött (pl. gyűjtemény neve).',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      admin: {
        description: 'Opcionális szekciócím. Ha üres, csak a diavetítés látszik.',
      },
    },
    {
      name: 'folder',
      type: 'relationship',
      label: 'Mappa',
      relationTo: 'payload-folders',
      required: true,
      admin: {
        description:
          'Válassz média mappát (pl. Plants). Csak a mappába közvetlenül tett képek kerülnek a diavetítésbe. Egy kép vágását a média szerkesztőben a fókuszponttal is finomhangolhatod.',
      },
    },
    {
      name: 'transition',
      type: 'select',
      label: 'Átmenet animáció',
      required: true,
      defaultValue: 'crossfade',
      options: [
        { label: 'Áttűnés', value: 'crossfade' },
        { label: 'Csúszás', value: 'slide' },
        { label: 'Áttűnés + nagyítás', value: 'fadeScale' },
        { label: 'Azonnali váltás', value: 'instant' },
      ],
    },
    {
      name: 'intervalMs',
      type: 'number',
      label: 'Képenkénti idő (ms)',
      required: true,
      defaultValue: 5000,
      min: 2000,
      max: 20000,
      admin: {
        description: 'Mennyi ideig látszik egy kép, mielőtt a következőre vált (2–20 mp).',
        step: 500,
      },
    },
  ],
}
