'use client'

import React, { useRef, useState, type FormEvent } from 'react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import {
  normalizeDemoRequest,
  validateDemoRequest,
  type DemoRequestFieldErrors,
  type DemoRequestInput
} from '../../lib/validation/demoRequest'
import type { DemoFormContent } from '../../lib/types/content-types'
import { trackEvent } from '../../lib/analytics'
import { getStoredUtm } from '../../lib/utm'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const emptyValues: DemoRequestInput = {
  name: '',
  establishment: '',
  size: '',
  mainNeed: '',
  email: '',
  phone: '',
  website: '',
  utm: {}
}

export default function DemoRequestForm({ content }: { content: DemoFormContent }) {
  const [values, setValues] = useState<DemoRequestInput>(emptyValues)
  const [errors, setErrors] = useState<DemoRequestFieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [formError, setFormError] = useState<string | null>(null)
  const hasStartedRef = useRef(false)

  function updateField<K extends keyof DemoRequestInput>(field: K, value: string) {
    // 'website' is the honeypot — a bot filling it shouldn't count as a real
    // visitor starting the form (docs/specs/09-analytics-tracking.md's
    // "Abandon" funnel step is about real prospects, not scripted traffic).
    if (!hasStartedRef.current && field !== 'website') {
      hasStartedRef.current = true
      trackEvent('demo_form_start')
    }
    setValues(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeDemoRequest(values)
    const fieldErrors = validateDemoRequest(normalized, content.errors)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) {
      return
    }

    setStatus('submitting')
    setFormError(null)
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // UTM travels with the visitor's own voluntary submission — the one
        // real "inscription" action on this site today (docs/specs/
        // 09-analytics-tracking.md: "l'attribution de campagne doit être
        // transmise via UTM jusqu'à l'inscription").
        body: JSON.stringify({ ...normalized, utm: getStoredUtm() })
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok || !payload?.ok) {
        setStatus('error')
        setErrors(payload?.errors ?? {})
        setFormError(content.errors.submitFailed)
        return
      }
      trackEvent('demo_form_submit')
      setStatus('success')
    } catch {
      setStatus('error')
      setFormError(content.errors.networkFailed)
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="text-ink-900">
        {content.successMessage}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-md">
      <Input
        label={content.fields.name.label}
        value={values.name}
        onChange={e => updateField('name', e.target.value)}
        error={errors.name}
        required
      />
      <Input
        label={content.fields.establishment.label}
        value={values.establishment}
        onChange={e => updateField('establishment', e.target.value)}
        error={errors.establishment}
        required
      />
      <Input
        label={content.fields.size.label}
        hint={content.fields.size.hint}
        value={values.size}
        onChange={e => updateField('size', e.target.value)}
        error={errors.size}
        required
      />
      <Textarea
        label={content.fields.mainNeed.label}
        hint={content.fields.mainNeed.hint}
        value={values.mainNeed}
        onChange={e => updateField('mainNeed', e.target.value)}
      />
      <Input
        label={content.fields.email.label}
        type="email"
        value={values.email}
        onChange={e => updateField('email', e.target.value)}
        error={errors.email}
        required
      />
      <Input
        label={content.fields.phone.label}
        hint={content.fields.phone.hint}
        type="tel"
        value={values.phone}
        onChange={e => updateField('phone', e.target.value)}
      />

      {/* Honeypot — off-screen, unfocusable, not part of the visible/accessible
          form. Named to look like a plausible autofill target for scripted bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">{content.honeypotLabel}</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={e => updateField('website', e.target.value)}
        />
      </div>

      {formError && (
        <p role="alert" className="text-sm text-signal-alert-text">
          {formError}
        </p>
      )}

      <p className="text-xs text-ink-900/70">{content.privacyNote}</p>

      <Button type="submit" isLoading={status === 'submitting'}>
        {status === 'submitting' ? content.submittingLabel : content.submitLabel}
      </Button>
    </form>
  )
}
