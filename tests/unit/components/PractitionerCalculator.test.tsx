import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PractitionerCalculator from '../../../src/components/pricing/PractitionerCalculator'
import pricing from '../../../content/pricing.json'
import tarifs from '../../../content/tarifs.json'
import type { PricingContent, TarifsContent } from '../../../src/lib/types/content-types'

const { tiers, currency } = pricing as PricingContent
const cabinet = tiers.find(t => t.id === 'cabinet')!
const content = tarifs as TarifsContent

describe('PractitionerCalculator', () => {
  it('shows the base price at 1 practitioner', () => {
    render(<PractitionerCalculator tier={cabinet} currency={currency} content={content} />)
    expect(screen.getByTestId('calculated-price').textContent).toContain(cabinet.price!.toLocaleString('fr-FR'))
  })

  it('increases the price when the stepper is incremented', async () => {
    render(<PractitionerCalculator tier={cabinet} currency={currency} content={content} />)
    await userEvent.click(screen.getByRole('button', { name: 'Ajouter un praticien' }))

    const expected = cabinet.price! + cabinet.perAdditionalPractitioner!
    expect(screen.getByTestId('calculated-price').textContent).toContain(expected.toLocaleString('fr-FR'))
  })

  it('shows the switch-to-Clinic note only once maxPractitioners is reached', async () => {
    render(<PractitionerCalculator tier={cabinet} currency={currency} content={content} />)
    expect(screen.queryByText(/Au-delà de \d+ praticiens/)).not.toBeInTheDocument()

    const incrementButton = screen.getByRole('button', { name: 'Ajouter un praticien' })
    for (let i = 1; i < cabinet.maxPractitioners!; i++) {
      await userEvent.click(incrementButton)
    }

    expect(screen.getByText(/Au-delà de \d+ praticiens/)).toBeInTheDocument()
    expect(incrementButton).toBeDisabled()
  })
})
