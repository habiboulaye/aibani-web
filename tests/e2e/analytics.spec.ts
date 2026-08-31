import { test, expect } from '@playwright/test'
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
})
