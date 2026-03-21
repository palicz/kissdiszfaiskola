import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { FooterSocialLinks } from './FooterSocialLinks'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  const navItems = footerData?.navItems || []
  const hasSocial = footerData.socialLinks?.some((row) => Boolean(row?.url?.trim())) ?? false
  const hasLeftText =
    Boolean(footerData.tagline?.trim()) || Boolean(footerData.copyrightLine?.trim())
  const showBottomBar = hasLeftText || hasSocial
  const bottomRowClass =
    hasLeftText && hasSocial
      ? 'md:justify-between'
      : hasSocial && !hasLeftText
        ? 'md:justify-end'
        : 'md:justify-start'

  return (
    <footer className="mt-auto w-full border-t border-stone-200 bg-stone-100 px-6 py-12 pb-16 text-stone-800 md:px-12 md:py-16 md:pb-20">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 text-center md:grid-cols-2 md:gap-20 md:text-left lg:grid-cols-3">
        <div>
          <span className="mb-6 block font-headline text-2xl italic text-emerald-950">
            Kiss Díszfaiskola
          </span>
          {footerData.aboutText ? (
            <p className="text-sm font-light leading-relaxed text-stone-600/80">
              {footerData.aboutText}
            </p>
          ) : null}
        </div>
        <div>
          <h4 className="mb-8 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-950 md:mb-10">
            Navigáció
          </h4>
          <ul className="space-y-4">
            {navItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  {...link}
                  appearance="inline"
                  className="text-sm font-light text-stone-600/80 underline decoration-stone-300 underline-offset-8 transition-colors hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-8 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-950 md:mb-10">
            Helyszín
          </h4>
          <ul className="space-y-5 text-sm font-light text-stone-600/80">
            {footerData.address ? (
              <li className="flex items-start gap-4 leading-relaxed">
                <span className="material-symbols-outlined mt-0.5 text-lg" aria-hidden>
                  pin_drop
                </span>
                {footerData.address}
              </li>
            ) : null}
            {footerData.phone ? (
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-lg" aria-hidden>
                  phone
                </span>
                <a
                  className="transition-colors hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                  href={`tel:${footerData.phone.replace(/\s/g, '')}`}
                >
                  {footerData.phone}
                </a>
              </li>
            ) : null}
            {footerData.email ? (
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-lg" aria-hidden>
                  mail
                </span>
                <a
                  className="transition-colors hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                  href={`mailto:${footerData.email}`}
                >
                  {footerData.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      {showBottomBar ? (
        <div
          className={`mx-auto mt-16 flex max-w-screen-2xl flex-col items-center gap-6 border-t border-stone-200 pt-10 md:mt-24 md:flex-row md:items-center md:pt-12 ${bottomRowClass}`}
        >
          {hasLeftText ? (
            <div className="flex max-w-xl flex-col items-center gap-3 text-center md:items-start md:text-left">
              {footerData.tagline ? (
                <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">
                  {footerData.tagline}
                </span>
              ) : null}
              {footerData.copyrightLine ? (
                <span className="text-[10px] tracking-widest text-stone-400 uppercase">
                  {footerData.copyrightLine}
                </span>
              ) : null}
            </div>
          ) : null}
          <FooterSocialLinks links={footerData.socialLinks} />
        </div>
      ) : null}
    </footer>
  )
}
