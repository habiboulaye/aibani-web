import React, { useId } from 'react'
import { cn } from '../../lib/cn'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  error?: string
  hint?: string
}

export default function Input({ label, error, hint, className, disabled, ...rest }: Props) {
  const inputId = useId()
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink-900">
        {label}
      </label>
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'rounded-control border px-3 py-2 text-sm text-ink-900 placeholder:text-mist-200/0',
          'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700',
          disabled ? 'cursor-not-allowed bg-mist-200/50 border-mist-200' : 'bg-white border-mist-200 focus:border-lagoon-900',
          error && 'border-signal-alert',
          className
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-900/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-signal-alert-text">
          {error}
        </p>
      )}
    </div>
  )
}
