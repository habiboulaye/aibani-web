import { test, expect } from '@playwright/test'
import demoContent from '../../content/demo.json'
import type { DemoContent } from '../../src/lib/types/content-types'

const { form } = demoContent as DemoContent

test.describe('demo request form', () => {
  test('fills and submits the real form, shows the success message', async ({ page }) => {
    await page.goto('/fr/demo')

    await page.getByLabel(form.fields.name.label).fill('Habiboulaye')
    await page.getByLabel(form.fields.establishment.label).fill('Cabinet Test')
    await page.getByLabel(form.fields.size.label).fill('3 praticiens')
    await page.getByLabel(form.fields.email.label).fill('test@example.com')
    await page.getByRole('button', { name: form.submitLabel }).click()

    await expect(page.getByRole('status')).toHaveText(form.successMessage)
  })

  test('the API route accepts a honeypot-filled request as a stealth success', async ({ request }) => {
    const response = await request.post('/api/demo-request', {
      data: {
        name: 'Bot',
        establishment: 'BotCo',
        size: '1',
        email: 'bot@example.com',
        website: 'http://spam.example'
      }
    })
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
  })

  test('the API route rejects an empty submission with field errors', async ({ request }) => {
    const response = await request.post('/api/demo-request', { data: {} })
    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(body.ok).toBe(false)
    expect(body.errors).toMatchObject({
      name: form.errors.nameRequired,
      establishment: form.errors.establishmentRequired,
      size: form.errors.sizeRequired,
      email: form.errors.emailRequired
    })
  })
})
