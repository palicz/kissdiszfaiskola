import type { RequiredDataFromCollectionSlug } from 'payload'

/** Tartalom adatbázis nélküli fejlesztéshez / első megnyitásig. Képek nélkül (helyfoglaló). */
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Kezdőlap',
  hero: {
    type: 'kissHome',
    eyebrow: 'ESTABLISHED 1994 • NAGYKÁLLÓ',
    headingLine1: 'Üdvözöljük a',
    headingLine2: 'Kiss Díszfaiskolában',
    description:
      'Kurátori gondossággal nevelt díszfák és különleges botanikai ritkaságok. Egy hely, ahol a szakértelem mélyebb gyökeret eresztett.',
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Növénykínálatunk',
          url: '#',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'Kerttervezési tanácsadás',
          url: '#',
        },
      },
    ],
    specimenLabel: 'Acer palmatum',
    specimenSublabel: 'Szezonális különlegesség',
  },
  layout: [
    {
      blockType: 'kissSpecimen',
      eyebrow: 'KIVÁLÓSÁG A KERTBEN',
      titleLine1: 'Válogatás az aktuális',
      titleLine2: 'botanikai kínálatunkból',
      listLink: {
        type: 'custom',
        label: 'Összes megtekintése',
        url: '#',
      },
      featureBadge: 'SZEZONÁLIS KEDVENC',
      featureTitleLine1: 'Japán juhar',
      featureTitleLine2: 'különlegességek',
      sideCardLabel: 'Örökzöldek',
      cardTitle: 'Örökzöld sövények',
      cardDescription:
        'Privát szféra és természetes keret kertje számára. Kiváló minőségű tuja és babérmeggy fajták, melyek átírják a kert definícióját.',
      cardLink: {
        type: 'custom',
        label: 'Részletek',
        url: '#',
      },
    },
    {
      blockType: 'kissVisit',
      title: 'Látogasson el hozzánk',
      statNumber: '30+',
      statLabel: 'Év szakmai tapasztalat',
      hoursHeading: 'NYITVATARTÁS',
      hoursRows: [
        { label: 'Hétfő – Péntek', value: '08:00 – 17:00', muted: false },
        { label: 'Szombat', value: '08:00 – 12:00', muted: false },
        { label: 'Vasárnap', value: 'Zárva', muted: true },
      ],
      contactHeading: 'KAPCSOLAT',
      addressTitle: 'Nagykálló',
      addressLines: '4320 Nagykálló, Korányi Frigyes út 81.',
    },
    {
      blockType: 'kissNewsletter',
      title: 'Szakértő tanácsadás kertjéhez',
      description:
        'Nem biztos benne, melyik növény illik legjobban otthonába? Szakértőink örömmel segítenek a választásban és a gondozási tanácsokban.',
      emailPlaceholder: 'AZ ÖN E-MAIL CÍME',
      buttonLabel: 'Feliratkozás',
      privacyNote:
        'Az e-mail-címét bizalmasan kezeljük, harmadik félnek nem adjuk át. A hírlevélről bármikor, könnyen leiratkozhat.',
    },
  ],
  meta: {
    description:
      'Kiss Díszfaiskola — díszfák, különleges botanikai ritkaságok és személyre szabott kertészeti tanácsadás Nagykállón.',
    title: 'Kiss Díszfaiskola | Kezdőlap',
  },
}
