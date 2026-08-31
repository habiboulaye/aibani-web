import type { DemoFormContent } from '../types/content-types'

export type DemoRequestInput = {
  name: string
  establishment: string
  size: string
  mainNeed: string
  email: string
  phone: string
  website: string // honeypot — never validated, never logged if filled
}

export type DemoRequestFieldErrors = Partial<{
  name: string
  establishment: string
  size: string
  email: string
}>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function toStr(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

// Coerces an unknown/untrusted body (client fetch payload or a raw request
// body) into a fully-typed, string-only shape — never trusts input types.
export function normalizeDemoRequest(body: unknown): DemoRequestInput {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  return {
    name: toStr(b.name).trim(),
    establishment: toStr(b.establishment).trim(),
    size: toStr(b.size).trim(),
    mainNeed: toStr(b.mainNeed).trim(),
    email: toStr(b.email).trim(),
    phone: toStr(b.phone).trim(),
    website: toStr(b.website)
  }
}

export function validateDemoRequest(
  input: DemoRequestInput,
  messages: DemoFormContent['errors']
): DemoRequestFieldErrors {
  const errors: DemoRequestFieldErrors = {}
  if (!input.name) errors.name = messages.nameRequired
  if (!input.establishment) errors.establishment = messages.establishmentRequired
  if (!input.size) errors.size = messages.sizeRequired
  if (!input.email) errors.email = messages.emailRequired
  else if (!EMAIL_RE.test(input.email)) errors.email = messages.emailInvalid
  return errors
}
