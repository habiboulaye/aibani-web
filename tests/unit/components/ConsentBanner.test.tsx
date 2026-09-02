import { describe, expect, it, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsentBanner from '../../../src/components/analytics/ConsentBanner'
import consentContent from '../../../content/consent.json'
import { getConsent, resetConsent } from '../../../src/lib/consent'
import type { ConsentContent } from '../../../src/lib/types/content-types'

const content = consentContent as ConsentContent

afterEach(() => {
  window.localStorage.clear()
})

describe('ConsentBanner', () => {
  it('shows the banner when no choice has been made yet', async () => {
    render(<ConsentBanner />)
    expect(await screen.findByText(content.message)).toBeInTheDocument()
  })

  it('hides itself and persists the choice once accepted', async () => {
    render(<ConsentBanner />)
    const acceptButton = await screen.findByRole('button', { name: content.acceptLabel })
    await userEvent.click(acceptButton)

    await waitFor(() => expect(screen.queryByText(content.message)).not.toBeInTheDocument())
    expect(getConsent()).toBe('accepted')
  })

  it('hides itself and persists the choice once refused', async () => {
    render(<ConsentBanner />)
    const refuseButton = await screen.findByRole('button', { name: content.refuseLabel })
    await userEvent.click(refuseButton)

    await waitFor(() => expect(screen.queryByText(content.message)).not.toBeInTheDocument())
    expect(getConsent()).toBe('refused')
  })

  it('stays hidden on a later mount once a choice was already made', async () => {
    window.localStorage.setItem('aibani:consent', 'accepted')
    render(<ConsentBanner />)
    await waitFor(() => expect(screen.queryByText(content.message)).not.toBeInTheDocument())
  })

  it('reappears when consent is withdrawn elsewhere (Footer\'s "manage preferences" control)', async () => {
    window.localStorage.setItem('aibani:consent', 'accepted')
    render(<ConsentBanner />)
    await waitFor(() => expect(screen.queryByText(content.message)).not.toBeInTheDocument())

    resetConsent()

    expect(await screen.findByText(content.message)).toBeInTheDocument()
  })
})
