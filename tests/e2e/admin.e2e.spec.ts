import { test, expect, Page } from '@playwright/test'
import { isAdminAppPath, login } from '../helpers/login'
import { testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test('dashboard is accessible after login', async () => {
    await page.goto('/admin')
    await expect(page).toHaveURL((url) => isAdminAppPath(url.pathname))
    await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible()
  })

  test('users collection list view loads', async () => {
    await page.goto('/admin/collections/users')
    await expect(page).toHaveURL(/\/admin\/collections\/users/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('page creation form is reachable', async () => {
    await page.goto('/admin/collections/pages/create')
    await expect(page).toHaveURL(/\/admin\/collections\/pages\//)
    await expect(page.locator('input[name="title"]')).toBeVisible()
  })
})
