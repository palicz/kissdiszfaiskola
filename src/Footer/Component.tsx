import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const legalLinks = footerData?.legalLinks || []

  return (
    <footer className="mt-auto w-full border-t border-stone-200 bg-stone-100 px-6 py-12 pb-16 text-stone-800 md:px-12 md:py-16 md:pb-20">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 text-center md:grid-cols-2 md:gap-20 md:text-left lg:grid-cols-4">
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
                  className="text-sm font-light text-stone-600/80 underline decoration-stone-300 underline-offset-8 transition-colors hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
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
                  className="transition-colors hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
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
                  className="transition-colors hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                  href={`mailto:${footerData.email}`}
                >
                  {footerData.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div>
          <h4 className="mb-8 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-950 md:mb-10">
            Jogi információk
          </h4>
          <ul className="space-y-4">
            {legalLinks.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  {...link}
                  appearance="inline"
                  className="text-sm font-light text-stone-600/80 underline decoration-stone-300 underline-offset-8 transition-colors hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
                />
              </li>
            ))}
            {footerData.copyrightLine ? (
              <li className="pt-6 text-[10px] tracking-widest text-stone-400 uppercase">
                {footerData.copyrightLine}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-screen-2xl flex-col items-center justify-between gap-6 border-t border-stone-200 pt-10 md:mt-24 md:flex-row md:pt-12">
        {footerData.tagline ? (
          <span className="text-center text-[10px] tracking-[0.3em] text-stone-400 uppercase md:text-left">
            {footerData.tagline}
          </span>
        ) : (
          <span />
        )}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <a
            aria-label="Közösségi felület (példa)"
            className="text-stone-400 transition-colors hover:text-b-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
            href="#"
          >
            <span className="material-symbols-outlined text-2xl font-extralight">
              social_leaderboard
            </span>
          </a>
          <a
            aria-label="Galéria (példa)"
            className="text-stone-400 transition-colors hover:text-b-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-b-primary"
            href="#"
          >
            <span className="material-symbols-outlined text-2xl font-extralight">camera</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
