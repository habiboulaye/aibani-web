import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Textarea from '../../../src/components/ui/Textarea'

describe('Textarea', () => {
  it('associates the label with the textarea via htmlFor/id', () => {
    render(<Textarea label="Besoin principal" />)
    expect(screen.getByLabelText('Besoin principal')).toBeInTheDocument()
  })

  it('wires the error message via aria-invalid and aria-describedby', () => {
    render(<Textarea label="Message" error="Ce champ est requis" />)
    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    const describedBy = textarea.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(describedBy!)).toHaveTextContent('Ce champ est requis')
  })

  it('wires the hint via aria-describedby when there is no error', () => {
    render(<Textarea label="Message" hint="Facultatif" />)
    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('aria-invalid', 'false')
    const describedBy = textarea.getAttribute('aria-describedby')
    expect(document.getElementById(describedBy!)).toHaveTextContent('Facultatif')
  })

  it('marks the textarea disabled', () => {
    render(<Textarea label="Message" disabled />)
    expect(screen.getByLabelText('Message')).toBeDisabled()
  })
})
