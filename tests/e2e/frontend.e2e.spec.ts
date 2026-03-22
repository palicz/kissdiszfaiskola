import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Kiss Díszfaiskola/)
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  })
})
