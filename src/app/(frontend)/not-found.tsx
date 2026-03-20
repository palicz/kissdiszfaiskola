import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { AppStatusPage } from '@/components/AppStatusPage'

export const metadata: Metadata = {
  title: 'Oldal nem található',
}

export default function NotFound() {
  return (
    <AppStatusPage
      actions={
        <Link
          className="inline-flex items-center justify-center rounded-md bg-b-primary px-6 py-3 font-sans text-sm font-medium text-b-on-primary transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
          href="/"
        >
          Vissza a főoldalra
        </Link>
      }
      code="404"
      description="A keresett címhez nem tartozik oldal, vagy az áthelyezésre került. Ellenőrizd a hivatkozást, vagy térj vissza a kezdőlapra."
      eyebrow="Oldal nem található"
      title="Nincs ilyen oldal"
    />
  )
}
