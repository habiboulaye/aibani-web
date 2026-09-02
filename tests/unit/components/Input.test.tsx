import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Input from '../../../src/components/ui/Input'

describe('Input', () => {
  it('associates the label with the input via htmlFor/id', () => {
    render(<Input label="Nom de l'établissement" />)
    expect(screen.getByLabelText("Nom de l'établissement")).toBeInTheDocument()
  })

  it('wires the error message via aria-invalid and aria-describedby', () => {
    render(<Input label="Email" error="Ce champ est requis" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(describedBy!)).toHaveTextContent('Ce champ est requis')
  })

  it('wires the hint via aria-describedby when there is no error', () => {
    render(<Input label="Email" hint="Utilisé pour vous contacter" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    const describedBy = input.getAttribute('aria-describedby')
    expect(document.getElementById(describedBy!)).toHaveTextContent('Utilisé pour vous contacter')
  })

  it('marks the input disabled', () => {
    render(<Input label="Nom" disabled />)
    expect(screen.getByLabelText('Nom')).toBeDisabled()
  })
})
