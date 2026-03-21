import type { Header } from '@/payload-types'

export type HeaderNavLinkData = NonNullable<NonNullable<Header['navItems']>[number]['link']>

export function normalizeNavPath(href: string): string {
  if (!href || href === '/') return '/'
  try {
    const u = new URL(href, 'https://example.com')
    return u.pathname.replace(/\/$/, '') || '/'
  } catch {
    return href.split('?')[0]?.replace(/\/$/, '') || '/'
  }
}

export function hrefFromNavLink(link: HeaderNavLinkData | null | undefined): string {
  if (!link) return ''
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value &&
    'slug' in link.reference.value
  ) {
    return `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
  }
  return link.url || ''
}

export function isNavPathActive(href: string, currentPath: string): boolean {
  const normalized = href ? normalizeNavPath(href) : ''
  if (!normalized) return false
  if (normalized === '/') return currentPath === '/'
  return currentPath === normalized || currentPath.startsWith(`${normalized}/`)
}
