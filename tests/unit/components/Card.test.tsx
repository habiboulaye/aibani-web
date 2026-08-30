import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../../../src/components/ui/Card'

describe('Card', () => {
  it('renders passed content verbatim', () => {
    render(<Card>Contenu de la carte</Card>)
    expect(screen.getByText('Contenu de la carte')).toBeInTheDocument()
  })

  it('uses the neutral border by default', () => {
    render(<Card>Standard</Card>)
    expect(screen.getByText('Standard').className).toContain('border-mist-200')
  })

  it('switches to the brand border when highlighted', () => {
    render(<Card highlighted>Mise en avant</Card>)
    expect(screen.getByText('Mise en avant').className).toContain('border-lagoon-900')
  })
})
