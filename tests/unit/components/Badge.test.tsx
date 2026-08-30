import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../../../src/components/ui/Badge'

describe('Badge', () => {
  it('renders passed content verbatim — no literal copy baked into the component', () => {
    render(<Badge variant="neutral">Bientôt disponible</Badge>)
    expect(screen.getByText('Bientôt disponible')).toBeInTheDocument()
  })

  it('uses the saturated accent fill only for the accent variant', () => {
    render(<Badge variant="accent">Gratuit</Badge>)
    expect(screen.getByText('Gratuit').className).toContain('bg-ember-500')
  })

  it('uses the soft-tint pattern (not a saturated fill) for success/alert', () => {
    render(<Badge variant="success">Actif</Badge>)
    const badge = screen.getByText('Actif')
    expect(badge.className).toContain('bg-signal-success/10')
    expect(badge.className).not.toContain('bg-signal-success ')
  })
})
