import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface LoginOptions {
  page: Page
  user: {
    email: string
    password: string
  }
}

/** True when we are in the authenticated admin app (not login / auth-only routes). */
export function isAdminAppPath(pathname: string): boolean {
  if (!pathname.startsWith('/admin')) return false
  if (pathname.startsWith('/admin/login')) return false
  if (pathname.startsWith('/admin/forgot')) return false
  if (pathname.startsWith('/admin/create-first-user')) return false
  return true
}

export async function login({ page, user }: LoginOptions): Promise<void> {
  await page.goto('/admin/login')

  await page.fill('#field-email', user.email)
  await page.fill('#field-password', user.password)
  await page.click('button[type="submit"]')

  await page.waitForURL((url) => isAdminAppPath(url.pathname))

  // Locale-agnostic: Payload admin uses i18n (this project defaults to Hungarian).
  await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible()
}
