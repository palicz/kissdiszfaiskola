import type { ReactNode } from 'react'

type AppStatusPageProps = {
  /** Nagy, dekoratív számkód (pl. 404) */
  code?: string
  eyebrow: string
  title: string
  description: string
  actions: ReactNode
}

export function AppStatusPage({ code, eyebrow, title, description, actions }: AppStatusPageProps) {
  return (
    <section className="bg-b-background pt-16 pb-10 md:pt-24 md:pb-14">
      <div className="container">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-b-outline-variant/30 bg-b-surface-container-lowest px-8 py-12 shadow-(--shadow-b-ambient) md:px-12 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-b-primary/[0.07]"
          />
          <div className="relative">
            {code ? (
              <p
                className="mb-6 font-headline text-[clamp(3.5rem,14vw,6rem)] font-medium leading-none tracking-tight text-b-primary/18 select-none md:mb-8"
                aria-hidden
              >
                {code}
              </p>
            ) : null}
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-b-on-surface-variant">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-headline text-3xl font-medium italic tracking-tight text-b-primary md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-b-on-surface-variant md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
