import { describe, expect, it, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DemoRequestForm from '../../../src/components/demo/DemoRequestForm'
import demoContent from '../../../content/demo.json'
import type { DemoContent } from '../../../src/lib/types/content-types'

const { form } = demoContent as DemoContent

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('DemoRequestForm', () => {
  it('shows every required-field error on an empty submit, without calling fetch', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    render(<DemoRequestForm content={form} />)

    await userEvent.click(screen.getByRole('button', { name: form.submitLabel }))

    expect(await screen.findByText(form.errors.nameRequired)).toBeInTheDocument()
    expect(screen.getByText(form.errors.establishmentRequired)).toBeInTheDocument()
    expect(screen.getByText(form.errors.sizeRequired)).toBeInTheDocument()
    expect(screen.getByText(form.errors.emailRequired)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits and shows the success message once the API confirms', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ ok: true }) })
    )
    render(<DemoRequestForm content={form} />)

    await userEvent.type(screen.getByLabelText(form.fields.name.label), 'Habiboulaye')
    await userEvent.type(screen.getByLabelText(form.fields.establishment.label), 'Cabinet Test')
    await userEvent.type(screen.getByLabelText(form.fields.size.label), '3 praticiens')
    await userEvent.type(screen.getByLabelText(form.fields.email.label), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: form.submitLabel }))

    expect(await screen.findByRole('status')).toHaveTextContent(form.successMessage)
    expect(fetch).toHaveBeenCalledWith(
      '/api/demo-request',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('shows a form-level error when the network request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    render(<DemoRequestForm content={form} />)

    await userEvent.type(screen.getByLabelText(form.fields.name.label), 'Habiboulaye')
    await userEvent.type(screen.getByLabelText(form.fields.establishment.label), 'Cabinet Test')
    await userEvent.type(screen.getByLabelText(form.fields.size.label), '3 praticiens')
    await userEvent.type(screen.getByLabelText(form.fields.email.label), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: form.submitLabel }))

    expect(await screen.findByRole('alert')).toHaveTextContent(form.errors.networkFailed)
  })

  it('keeps the honeypot field out of the accessible label list a real user sees', () => {
    render(<DemoRequestForm content={form} />)
    const honeypot = document.getElementById('website')
    expect(honeypot).toHaveAttribute('tabIndex', '-1')
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull()
  })
})
