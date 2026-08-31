import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import patients from '../../content/patients.json'
import type { PatientsContent } from '../../src/lib/types/content-types'

const content = patients as PatientsContent

test.describe('/patients', () => {
  test('loads with the page title as the single h1', async ({ page }) => {
    await page.goto('/fr/patients')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(content.title)
  })

  test('renders every "how it works" step', async ({ page }) => {
    await page.goto('/fr/patients')
    for (const step of content.steps) {
      await expect(page.getByText(step.title, { exact: true })).toBeVisible()
    }
  })

  test('the primary CTA and both store links point to their real destinations', async ({ page }) => {
    await page.goto('/fr/patients')

    const findProfessional = page.getByRole('link', { name: content.findProfessionalCtaLabel, exact: true })
    await expect(findProfessional).toHaveAttribute('href', content.findProfessionalHref)

    const appStore = page.getByRole('link', { name: content.appStoreLabel, exact: true })
    await expect(appStore).toHaveAttribute('href', content.appStoreUrl)

    const playStore = page.getByRole('link', { name: content.playStoreLabel, exact: true })
    await expect(playStore).toHaveAttribute('href', content.playStoreUrl)
  })

  test('the pro gateway link goes back to the homepage', async ({ page }) => {
    await page.goto('/fr/patients')
    const gateway = page.getByRole('link', { name: content.proGatewayCtaLabel, exact: true })
    await expect(gateway).toHaveAttribute('href', '/fr')
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/fr/patients')
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})
