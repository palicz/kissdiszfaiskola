import type { Block } from 'payload'

const anchorValidate = (val: unknown): string | true => {
  if (typeof val !== 'string' || !val.trim()) return 'Kötelező horgony-azonosító.'
  const v = val.trim().toLowerCase()
  if (!/^[a-z][a-z0-9-]*$/.test(v)) {
    return 'Csak angol kisbetű, szám és kötőjel (pl. cserjek, diszfak). Szóköz ne legyen.'
  }
  return true
}

export const KissPlantCatalog: Block = {
  slug: 'kissPlantCatalog',
  interfaceName: 'KissPlantCatalogBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Főcím',
      required: true,
      defaultValue: 'Növénykatalógus',
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Szárnyas felirat a főcím felett',
      admin: { description: 'Pl. Botanikai gyűjtemény (opcionális).' },
    },
    {
      name: 'introImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Bevezető kép',
      admin: { description: 'Mobilon gyakran magas (álló), asztalon opcionális.' },
    },
    {
      name: 'introBody',
      type: 'textarea',
      label: 'Bevezető szöveg',
      admin: { rows: 5 },
    },
    {
      name: 'introNote',
      type: 'textarea',
      label: 'Kiemelt doboz (kis figyelmeztetés / infó)',
      admin: {
        rows: 4,
        description: 'Halvány háttér + bal szegéllyel jelenik meg a bevezető alatt.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Katalógus szakaszok',
      minRows: 1,
      labels: { singular: 'szakasz', plural: 'szakaszok' },
      admin: {
        description:
          'Minden szakasznak egyedi „Horgony” kell (pl. cserjek). Ezt használja a mobil felső gárd és az asztali oldalsáv.',
      },
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          label: 'Horgony (URL #…)',
          required: true,
          validate: anchorValidate,
          admin: {
            placeholder: 'cserjek',
            description:
              'Egyedi azonosító: csak kisbetű, szám, kötőjel. Pl. cserjek, orokzoldek, diszfak',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Szakasz címe',
          required: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Jobb oldali kis felirat',
          admin: { description: 'Pl. ÁRLISTÁNK VÁLASZTÉKA vagy angol rövid címke.' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Rövid bevezető a szakaszhoz',
          admin: { rows: 3 },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Fő kép',
        },
        {
          name: 'imageSecondary',
          type: 'upload',
          relationTo: 'media',
          label: 'Második kép (opcionális)',
          admin: {
            description:
              'Mobilon gyakran két négyzet (pl. örökzöldek). Asztalon a fő kép marad a kiosztásban.',
          },
        },
        {
          name: 'imageCaption',
          type: 'text',
          label: 'Képaláírás',
        },
        {
          name: 'desktopLayout',
          type: 'select',
          label: 'Asztali elrendezés (kép + szöveg)',
          defaultValue: 'textLeftImageRight',
          options: [
            {
              label: 'Szöveg balra, kép jobbra',
              value: 'textLeftImageRight',
            },
            {
              label: 'Kép balra, szöveg jobbra',
              value: 'imageLeftTextRight',
            },
            {
              label: 'Egymás alatt (kép felül, teljes szélesség)',
              value: 'stacked',
            },
          ],
        },
        {
          name: 'groups',
          type: 'array',
          label: 'Alcsoportok és növénylista',
          labels: { singular: 'alcsoport', plural: 'alcsoportok' },
          admin: {
            description:
              '„Felsorolás” mezőben minden új sor egy listaelem. Üres alcím esetén csak a lista jelenik meg.',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Alcím',
              admin: { description: 'Pl. Lombhullatók. Hagyja üresen, ha egyetlen lista kell.' },
            },
            {
              name: 'intro',
              type: 'textarea',
              label: 'Rövid szöveg az alcím alá',
              admin: { rows: 2 },
            },
            {
              name: 'listContent',
              type: 'textarea',
              label: 'Felsorolás',
              admin: {
                rows: 14,
                description:
                  'Minden új sor = egy külön pont a listában. Másolható Wordből / Jegyzettömbből. Kettősponttal írhat alcímet egy sorban (pl. Gömbfák: juhar, kőris).',
              },
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Kiss — Növénykatalógus',
    singular: 'Kiss — Növénykatalógus',
  },
}
