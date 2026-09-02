import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../../../src/components/ui/Button'

describe('Button', () => {
  it('renders passed content verbatim', () => {
    render(<Button>Créer mon établissement</Button>)
    expect(screen.getByRole('button', { name: 'Créer mon établissement' })).toBeInTheDocument()
  })

  it('applies the correct variant classes', () => {
    render(<Button variant="secondary">Secondaire</Button>)
    const button = screen.getByRole('button', { name: 'Secondaire' })
    expect(button.className).toContain('border-lagoon-900')
    expect(button.className).not.toContain('bg-lagoon-900')
  })

  it('blocks clicks when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Désactivé
      </Button>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Désactivé' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('blocks clicks while loading, same as disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button isLoading onClick={onClick}>
        Chargement
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Chargement' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders a link, not a button, when href is passed', () => {
    render(<Button href="/demo">Demander une démo</Button>)
    const link = screen.getByRole('link', { name: 'Demander une démo' })
    expect(link).toHaveAttribute('href', '/demo')
  })

  it('lets a consumer className win over the default variant background', () => {
    render(<Button className="bg-signal-alert">Custom</Button>)
    const button = screen.getByRole('button', { name: 'Custom' })
    expect(button.className).toContain('bg-signal-alert')
    expect(button.className).not.toContain('bg-lagoon-900')
  })
})
