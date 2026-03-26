import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('homepage loads and renders a heading', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Kiss Díszfaiskola/)
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  })

  test('returns 404 for non-existent routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })
})
