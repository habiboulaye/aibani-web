import React, { useId } from 'react'
import { cn } from '../../lib/cn'

type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  label: string
  error?: string
  hint?: string
}

export default function Textarea({ label, error, hint, className, disabled, rows = 4, ...rest }: Props) {
  const textareaId = useId()
  const hintId = hint ? `${textareaId}-hint` : undefined
  const errorId = error ? `${textareaId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-ink-900">
        {label}
      </label>
      <textarea
        id={textareaId}
        disabled={disabled}
        rows={rows}
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
