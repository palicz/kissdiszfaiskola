import type { Field, Validate } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

const impactTypes = ['highImpact', 'mediumImpact', 'lowImpact'] as const

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Típus',
      options: [
        {
          label: 'Nincs hero',
          value: 'none',
        },
        {
          label: 'Kiss — főoldal hero',
          value: 'kissHome',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Felső sor (kis nagybetűs)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
        description: 'Pl. „ESTABLISHED 1994 • NAGYKÁLLÓ”.',
      },
    },
    {
      name: 'headingLine1',
      type: 'text',
      label: 'Cím — 1. sor',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
        description: 'Egy sorban marad (pl. „Üdvözöljük a”).',
      },
    },
    {
      name: 'headingLine2',
      type: 'text',
      label: 'Cím — 2. sor (dőlt)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Bevezető szöveg',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Fő kép',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
        description:
          'Feltöltés után válaszd ki; üres esetén szürke helyfoglaló. Asztalin a jobb oldali nagy kép.',
      },
    },
    {
      name: 'overlapImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Második kép (főleg mobil)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
        description: 'Átlapolódó kép mobilnézetben.',
      },
    },
    {
      name: 'specimenLabel',
      type: 'text',
      label: 'Kis kártya — növénynév (asztali)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
      },
    },
    {
      name: 'specimenSublabel',
      type: 'text',
      label: 'Kis kártya — alcím (asztali)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'kissHome',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Szöveg (sablon hero)',
      admin: {
        condition: (_, siblingData) =>
          Boolean(
            siblingData?.type &&
            impactTypes.includes(siblingData.type as (typeof impactTypes)[number]),
          ),
      },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        label: 'Gombok / linkek',
        maxRows: 2,
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.type && siblingData.type !== 'none'),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Kép (sablon hero)',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact' || type === 'mediumImpact',
      },
      relationTo: 'media',
      validate: ((value, { data }) => {
        const t = (data as { hero?: { type?: string } } | undefined)?.hero?.type
        if ((t === 'highImpact' || t === 'mediumImpact') && !value) {
          return 'Kötelező mező ennél a hero típusnál.'
        }
        return true
      }) as Validate,
    },
  ],
  label: false,
}
