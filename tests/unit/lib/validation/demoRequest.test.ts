import { describe, expect, it } from 'vitest'
import { normalizeDemoRequest, validateDemoRequest } from '../../../../src/lib/validation/demoRequest'
import demoContent from '../../../../content/demo.json'
import type { DemoContent } from '../../../../src/lib/types/content-types'

const { errors: messages } = (demoContent as DemoContent).form

describe('normalizeDemoRequest', () => {
  it('coerces a missing/malformed body into an all-string shape instead of throwing', () => {
    expect(normalizeDemoRequest(null)).toEqual({
      name: '',
      establishment: '',
      size: '',
      mainNeed: '',
      email: '',
      phone: '',
      website: '',
      utm: {}
    })
    expect(normalizeDemoRequest({ name: 123, establishment: [] })).toMatchObject({
      name: '',
      establishment: ''
    })
  })

  it('trims whitespace on real fields but never on the honeypot', () => {
    const result = normalizeDemoRequest({ name: '  Habiboulaye  ', website: '  http://spam.example  ' })
    expect(result.name).toBe('Habiboulaye')
    expect(result.website).toBe('  http://spam.example  ')
  })

  it('keeps string-valued utm entries and drops non-string values', () => {
    const result = normalizeDemoRequest({
      utm: { utm_source: 'linkedin', utm_medium: 42 }
    })
    expect(result.utm).toEqual({ utm_source: 'linkedin' })
  })

  it('coerces a missing/malformed utm into an empty object instead of throwing', () => {
    expect(normalizeDemoRequest({ utm: 'not-an-object' }).utm).toEqual({})
    expect(normalizeDemoRequest({}).utm).toEqual({})
  })
})

describe('validateDemoRequest', () => {
  const valid = {
    name: 'Habiboulaye',
    establishment: 'Cabinet Test',
    size: '3 praticiens',
    mainNeed: '',
    email: 'test@example.com',
    phone: '',
    website: '',
    utm: {}
  }

  it('passes on a fully valid submission', () => {
    expect(validateDemoRequest(valid, messages)).toEqual({})
  })

  it('flags every required field missing on an empty submission', () => {
    const errors = validateDemoRequest(
      { name: '', establishment: '', size: '', mainNeed: '', email: '', phone: '', website: '', utm: {} },
      messages
    )
    expect(errors).toEqual({
      name: messages.nameRequired,
      establishment: messages.establishmentRequired,
      size: messages.sizeRequired,
      email: messages.emailRequired
    })
  })

  it('rejects a malformed email without flagging it as missing', () => {
    const errors = validateDemoRequest({ ...valid, email: 'not-an-email' }, messages)
    expect(errors).toEqual({ email: messages.emailInvalid })
  })

  it('does not require mainNeed or phone', () => {
    expect(validateDemoRequest({ ...valid, mainNeed: '', phone: '' }, messages)).toEqual({})
  })
})
