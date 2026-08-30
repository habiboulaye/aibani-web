import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('design system reference page', () => {
  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/design-system')
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })

  test('color swatches match the reference screenshot', async ({ page }) => {
    await page.goto('/design-system')
    await expect(page.locator('section', { has: page.getByRole('heading', { name: 'Couleurs' }) })).toHaveScreenshot(
      'colors.png'
    )
  })

  test('typography scale matches the reference screenshot', async ({ page }) => {
    await page.goto('/design-system')
    await expect(
      page.locator('section', { has: page.getByRole('heading', { name: 'Typographie' }) })
    ).toHaveScreenshot('typography.png')
  })

  test('button variants and states match the reference screenshot', async ({ page }) => {
    await page.goto('/design-system')
    await expect(page.locator('section', { has: page.getByRole('heading', { name: 'Boutons' }) })).toHaveScreenshot(
      'buttons.png'
    )
  })

  test('input states match the reference screenshot', async ({ page }) => {
    await page.goto('/design-system')
    await expect(
      page.locator('section', { has: page.getByRole('heading', { name: 'Champs de formulaire' }) })
    ).toHaveScreenshot('inputs.png')
  })

  test('cards match the reference screenshot', async ({ page }) => {
    await page.goto('/design-system')
    await expect(page.locator('section', { has: page.getByRole('heading', { name: 'Cards' }) })).toHaveScreenshot(
      'cards.png'
    )
  })

  test('badges match the reference screenshot', async ({ page }) => {
    await page.goto('/design-system')
    await expect(page.locator('section', { has: page.getByRole('heading', { name: 'Badges' }) })).toHaveScreenshot(
      'badges.png'
    )
  })
})
