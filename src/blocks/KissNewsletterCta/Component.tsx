'use client'

import React, { useCallback, useMemo, useState } from 'react'

import type { Form as FormDoc } from '@/payload-types'
import type { KissNewsletterBlock as KissNewsletterBlockProps } from '@/payload-types'

import { getClientSideURL } from '@/utilities/getURL'

function getEmailFieldName(form: FormDoc | number | null | undefined): string | undefined {
  if (!form || typeof form === 'number') return undefined
  const emailField = form.fields?.find((f) => f.blockType === 'email')
  return emailField && 'name' in emailField ? emailField.name : undefined
}

export const KissNewsletterBlock: React.FC<KissNewsletterBlockProps> = (props) => {
  const { title, description, emailPlaceholder, buttonLabel, privacyNote, newsletterForm, successMessage } =
    props

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formDoc = typeof newsletterForm === 'object' && newsletterForm !== null ? newsletterForm : null
  const formId = formDoc?.id
  const emailFieldName = useMemo(() => getEmailFieldName(formDoc), [formDoc])

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      if (!formId || !emailFieldName) {
        setError('Nincs beállítva Payload űrlap ehhez a blokkhoz.')
        return
      }

      const trimmed = email.trim()
      if (!trimmed) {
        setError('Adja meg az e-mail címét.')
        return
      }

      setIsLoading(true)
      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formId,
            submissionData: [{ field: emailFieldName, value: trimmed }],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = (await req.json()) as { errors?: { message?: string }[] }

        if (req.status >= 400) {
          setError(res.errors?.[0]?.message || 'A beküldés sikertelen.')
          return
        }

        setHasSubmitted(true)
      } catch {
        setError('Hiba történt. Próbálja újra később.')
      } finally {
        setIsLoading(false)
      }
    },
    [email, emailFieldName, formId],
  )

  const thankYou = successMessage?.trim() || 'Köszönjük a feliratkozást!'
  const noFormConfigured = !formId || !emailFieldName

  return (
    <>
      <section className="bg-b-surface-dim px-6 py-16 lg:hidden">
        <div className="mx-auto max-w-sm space-y-6 text-center">
          <span className="material-symbols-outlined text-4xl text-b-tertiary" aria-hidden>
            mail
          </span>
          <h3 className="font-headline text-3xl leading-tight text-b-primary">{title}</h3>
          {description ? (
            <p className="font-sans text-sm leading-relaxed text-b-secondary">{description}</p>
          ) : null}
          {hasSubmitted ? (
            <p className="font-sans text-sm font-medium text-b-primary" role="status">
              {thankYou}
            </p>
          ) : (
            <form className="space-y-3 text-left" onSubmit={onSubmit} noValidate>
              <label className="sr-only" htmlFor="kiss-newsletter-email-mobile">
                E-mail a feliratkozáshoz
              </label>
              <input
                autoComplete="email"
                className="w-full rounded-md border border-b-outline-variant bg-b-surface-container-lowest px-4 py-3 font-sans text-sm text-b-on-surface shadow-sm transition-all placeholder:text-b-on-surface-variant/75 focus:border-b-primary focus:ring-2 focus:ring-b-primary/20 focus:outline-none"
                disabled={isLoading || noFormConfigured}
                id="kiss-newsletter-email-mobile"
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder={emailPlaceholder || 'Az Ön e-mail címe'}
                type="email"
                value={email}
              />
              <button
                className="w-full rounded-md bg-b-primary py-3 font-sans text-sm font-semibold tracking-wide text-b-on-primary transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary disabled:opacity-50"
                disabled={isLoading || noFormConfigured}
                type="submit"
              >
                {(buttonLabel || 'Feliratkozás').toUpperCase()}
              </button>
              {isLoading ? (
                <p className="font-sans text-xs text-b-secondary">Küldés…</p>
              ) : null}
              {error ? (
                <p className="font-sans text-xs text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
              {noFormConfigured ? (
                <p className="font-sans text-xs text-b-secondary">
                  A feliratkozás adminban nincs bekötve: válasszon űrlapot a blokk szerkesztőben.
                </p>
              ) : null}
            </form>
          )}
          {privacyNote ? (
            <p className="font-sans text-xs leading-relaxed text-b-secondary/85">{privacyNote}</p>
          ) : null}
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-b-primary py-16 md:py-24 lg:block">
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-1 text-center md:px-12 md:pb-2">
          <h2 className="mb-6 font-headline text-4xl text-b-on-primary editorial-spacing md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mb-12 text-lg font-light leading-relaxed text-b-on-primary/60 md:mb-16 md:text-xl">
              {description}
            </p>
          ) : null}
          {hasSubmitted ? (
            <p className="font-sans text-lg text-b-on-primary/90" role="status">
              {thankYou}
            </p>
          ) : (
            <form
              className="flex flex-col justify-center gap-0 sm:flex-row"
              onSubmit={onSubmit}
              noValidate
            >
              <label className="sr-only" htmlFor="kiss-newsletter-email-desktop">
                E-mail a feliratkozáshoz
              </label>
              <input
                autoComplete="email"
                className="min-w-0 flex-1 border-0 border-b border-b-primary-fixed/20 bg-b-primary-container px-6 py-4 font-sans text-b-on-primary placeholder:text-b-on-primary/30 focus:border-b-on-primary/40 focus:ring-0 focus:outline-none sm:min-w-[280px] md:min-w-[350px]"
                disabled={isLoading || noFormConfigured}
                id="kiss-newsletter-email-desktop"
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder={emailPlaceholder || ''}
                type="email"
                value={email}
              />
              <button
                className="bg-white px-8 py-4 font-sans text-xs font-bold tracking-[0.2em] text-b-primary transition-colors hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50"
                disabled={isLoading || noFormConfigured}
                type="submit"
              >
                {buttonLabel}
              </button>
            </form>
          )}
          {isLoading && !hasSubmitted ? (
            <p className="mt-4 font-sans text-sm text-b-on-primary/60">Küldés…</p>
          ) : null}
          {error && !hasSubmitted ? (
            <p className="mt-4 font-sans text-sm text-red-200" role="alert">
              {error}
            </p>
          ) : null}
          {noFormConfigured && !hasSubmitted ? (
            <p className="mt-4 font-sans text-xs text-b-on-primary/50">
              A feliratkozás adminban nincs bekötve: válasszon űrlapot a blokk szerkesztőben.
            </p>
          ) : null}
          {privacyNote ? (
            <p className="mx-auto mt-8 max-w-2xl font-sans text-xs leading-relaxed text-b-on-primary/45 md:mt-10">
              {privacyNote}
            </p>
          ) : null}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
        >
          <span className="material-symbols-outlined text-[20rem] leading-none md:text-[600px]">
            eco
          </span>
        </div>
      </section>
    </>
  )
}
