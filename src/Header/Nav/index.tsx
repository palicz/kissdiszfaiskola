'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

import { HeaderNavDropdownDesktop, HeaderNavDropdownMobile } from './HeaderNavDropdown'
import { hrefFromNavLink, isNavPathActive } from '../navLinkUtils'

const navLinkClass =
  'font-headline text-lg font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-b-primary'

export const HeaderNav: React.FC<{
  data: HeaderType
  mobile?: boolean
}> = ({ data, mobile }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const current = pathname ? pathname.replace(/\/$/, '') || '/' : '/'

  return (
    <nav
      className={cn('flex items-center gap-7 lg:gap-10', mobile && 'flex-col items-stretch gap-4')}
      aria-label={mobile ? undefined : 'Fő navigáció'}
    >
      {navItems.map((item, i) => {
        const key = item.id ?? `nav-${i}`

        if (item.itemType === 'dropdown') {
          return mobile ? (
            <HeaderNavDropdownMobile currentPath={current} item={item} key={key} />
          ) : (
            <HeaderNavDropdownDesktop currentPath={current} item={item} key={key} />
          )
        }

        const link = item.link
        if (!link) return null

        const href = hrefFromNavLink(link)
        const isActive = isNavPathActive(href, current)

        return (
          <CMSLink
            key={key}
            {...link}
            appearance="inline"
            className={cn(
              navLinkClass,
              mobile ? 'border-b border-stone-100 py-2' : '',
              isActive ? 'text-b-primary' : 'text-b-primary/72 hover:text-b-primary',
            )}
          />
        )
      })}
    </nav>
  )
}
