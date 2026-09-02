import { NextResponse } from 'next/server'
import demoContent from '../../../../content/demo.json'
import type { DemoContent } from '../../../lib/types/content-types'
import { normalizeDemoRequest, validateDemoRequest } from '../../../lib/validation/demoRequest'

const content = demoContent as DemoContent

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, errors: { form: content.form.errors.malformed } }, { status: 400 })
  }

  const input = normalizeDemoRequest(body)

  // Honeypot: a hidden field real users never see or fill. Respond exactly
  // like a genuine success (same status, same body shape) so a scripted bot
  // can't distinguish "caught" from "accepted" by inspecting the response —
  // but never validate, log, or process the payload.
  if (input.website !== '') {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const errors = validateDemoRequest(input, content.form.errors)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // TODO(backend): no email/CRM service is chosen yet — see
  // docs/decisions/0010-demo-form-scope-and-stub-backend.md. This console.log
  // is an honest stub, not a fake "email sent": replace this block, and only
  // this block, once a real integration is decided. Logging (rather than
  // silently discarding) ensures no real lead is lost in the meantime.
  console.log('[demo-request]', {
    name: input.name,
    establishment: input.establishment,
    size: input.size,
    mainNeed: input.mainNeed,
    email: input.email,
    phone: input.phone,
    receivedAt: new Date().toISOString()
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
