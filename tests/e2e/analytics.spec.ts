import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import consentContent from '../../content/consent.json'
import type { ConsentContent } from '../../src/lib/types/content-types'

const content = consentContent as ConsentContent

test.describe('consent banner', () => {
  test('shows on first visit and disappears once accepted, persisting across a reload', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.getByText(content.message)).toBeVisible()

    await page.getByRole('button', { name: content.acceptLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toHaveCount(0)

    await page.reload()
    await expect(page.getByText(content.message)).toHaveCount(0)
  })

  test('disappears once refused, persisting across a reload', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.getByText(content.message)).toBeVisible()

    await page.getByRole('button', { name: content.refuseLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toHaveCount(0)

    await page.reload()
    await expect(page.getByText(content.message)).toHaveCount(0)
  })

  test('does not block navigation — a tracked CTA still navigates to its real destination', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('button', { name: content.refuseLabel, exact: true }).click()

    await page.getByRole('link', { name: /Créer mon établissement/, exact: false }).first().click()
    await expect(page).toHaveURL(/\/fr\/tarifs/)
  })

  test('withdrawing consent via the footer control re-shows the banner', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('button', { name: content.acceptLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toHaveCount(0)

    await page.getByRole('button', { name: content.manageLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toBeVisible()
  })

  test('has no serious or critical accessibility violations while visible', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.getByText(content.message)).toBeVisible()
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})
