'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { AppStatusPage } from '@/components/AppStatusPage'

const primaryBtn =
  'inline-flex items-center justify-center rounded-md bg-b-primary px-6 py-3 font-sans text-sm font-medium text-b-on-primary transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary'

const secondaryBtn =
  'inline-flex items-center justify-center rounded-md border border-b-primary/25 bg-transparent px-6 py-3 font-sans text-sm font-medium text-b-primary transition-colors hover:bg-b-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <AppStatusPage
      actions={
        <>
          <button className={secondaryBtn} onClick={() => reset()} type="button">
            Újrapróbálás
          </button>
          <Link className={primaryBtn} href="/">
            Főoldal
          </Link>
        </>
      }
      description="Váratlan hiba történt betöltés közben. Ha továbbra is ezt látod, térj vissza később, vagy lépj a főoldalra."
      eyebrow="Technikai hiba"
      title="Nem sikerült betölteni az oldalt"
    />
  )
}
