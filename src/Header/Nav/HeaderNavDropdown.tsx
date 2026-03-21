'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { cn } from '@/utilities/ui'

import { hrefFromNavLink, isNavPathActive } from '../navLinkUtils'

type NavRow = NonNullable<Header['navItems']>[number]

const navLinkClass =
  'font-headline text-lg font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-b-primary'

const HOVER_CLOSE_MS = 180

const dropdownPanelClass = cn(
  'z-[200] min-w-[15rem] overflow-hidden rounded-xl border border-b-outline-variant/25',
  'bg-b-surface-container-lowest shadow-[0_16px_48px_rgb(0_40_36_/_0.11)]',
  'ring-1 ring-b-primary/[0.04]',
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
  'duration-200 ease-out',
)

const itemClass = cn(
  'block w-full cursor-pointer rounded-lg px-3.5 py-3 font-headline text-[0.98rem] leading-snug tracking-tight select-none',
  'text-b-on-surface transition-[background,color] duration-150 ease-out',
  'no-underline outline-none focus-visible:ring-2 focus-visible:ring-b-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface-container-lowest',
  'data-[highlighted]:bg-b-secondary-container/55 data-[highlighted]:text-b-primary',
)

export const HeaderNavDropdownDesktop: React.FC<{
  item: NavRow
  currentPath: string
}> = ({ item, currentPath }) => {
  const label = item.dropdownLabel?.trim() || 'Továbbiak'
  const rows = item.dropdownItems?.filter((r) => r?.link) ?? []
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const openMenu = useCallback(() => {
    cancelClose()
    setOpen(true)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
      closeTimerRef.current = null
    }, HOVER_CLOSE_MS)
  }, [cancelClose])

  useEffect(() => {
    return () => cancelClose()
  }, [cancelClose])

  if (rows.length === 0) return null

  const childActive = rows.some((r) => isNavPathActive(hrefFromNavLink(r.link), currentPath))

  return (
    <DropdownMenu.Root modal={false} onOpenChange={setOpen} open={open}>
      <DropdownMenu.Trigger
        className={cn(
          navLinkClass,
          'inline-flex items-center gap-1 rounded-sm border-0 bg-transparent p-0 text-left',
          '[&[data-state=open]_svg]:rotate-180',
          childActive ? 'text-b-primary' : 'text-b-primary/72 hover:text-b-primary',
          'data-[state=open]:text-b-primary',
        )}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        type="button"
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 opacity-70 transition-transform duration-300 ease-out"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={dropdownPanelClass}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          sideOffset={6}
        >
          <div className="divide-y divide-b-outline-variant/15 p-1.5">
            {rows.map((row) => {
              const href = hrefFromNavLink(row.link)
              if (!href) return null
              const active = isNavPathActive(href, currentPath)
              const text = row.link?.label || href

              return (
                <DropdownMenu.Item
                  asChild
                  className={cn(itemClass, active && 'bg-b-secondary-container/60 text-b-primary')}
                  key={row.id ?? href}
                >
                  <Link href={href}>{text}</Link>
                </DropdownMenu.Item>
              )
            })}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export const HeaderNavDropdownMobile: React.FC<{
  item: NavRow
  currentPath: string
}> = ({ item, currentPath }) => {
  const label = item.dropdownLabel?.trim() || 'Továbbiak'
  const rows = item.dropdownItems?.filter((r) => r?.link) ?? []

  if (rows.length === 0) return null

  const childActive = rows.some((r) => isNavPathActive(hrefFromNavLink(r.link), currentPath))

  return (
    <details className="group border-b border-stone-100 py-1">
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-2 py-2 font-headline text-lg font-medium tracking-tight',
          '[&::-webkit-details-marker]:hidden',
          childActive ? 'text-b-primary' : 'text-b-primary/72',
        )}
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden
          className="size-5 shrink-0 opacity-70 transition-transform duration-300 ease-out group-open:rotate-180"
        />
      </summary>
      <ul className="border-l border-b-outline-variant/40 pb-2 pl-4 pt-1">
        {rows.map((row) => {
          const href = hrefFromNavLink(row.link)
          if (!href) return null
          const active = isNavPathActive(href, currentPath)
          const text = row.link?.label || href

          return (
            <li key={row.id ?? href}>
              <Link
                className={cn(
                  'block rounded-md py-2 pl-1 font-headline text-base transition-colors duration-150',
                  active ? 'text-b-primary' : 'text-b-on-surface-variant hover:text-b-primary',
                )}
                href={href}
              >
                {text}
              </Link>
            </li>
          )
        })}
      </ul>
    </details>
  )
}
