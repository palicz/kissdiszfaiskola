'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

function normalizePath(href: string): string {
  if (!href || href === '/') return '/'
  try {
    const u = new URL(href, 'https://example.com')
    return u.pathname.replace(/\/$/, '') || '/'
  } catch {
    return href.split('?')[0]?.replace(/\/$/, '') || '/'
  }
}

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
      {navItems.map(({ link }, i) => {
        const href =
          link?.type === 'reference' &&
          typeof link.reference?.value === 'object' &&
          link.reference.value &&
          'slug' in link.reference.value
            ? `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
            : link?.url || ''

        const normalized = href ? normalizePath(href) : ''
        const isActive = normalized === current || (normalized === '/' && current === '/')

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={cn(
              'font-headline text-lg font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-b-primary',
              mobile ? 'border-b border-stone-100 py-2' : '',
              isActive ? 'text-b-primary' : 'text-b-primary/72 hover:text-b-primary',
            )}
          />
        )
      })}
    </nav>
  )
}
