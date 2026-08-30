import React from 'react'
import { cn } from '../../lib/cn'

export type BadgeVariant = 'accent' | 'neutral' | 'success' | 'alert'

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  // The one saturated fill — spec's "rare et délibéré" case (e.g. "Gratuit").
  accent: 'bg-ember-500 text-ink-900',
  // e.g. "Bientôt disponible", "Selon configuration".
  neutral: 'bg-mist-200 text-ink-900',
  // Soft-tint pattern: a filled small badge fails contrast at any single hex
  // for these two colors, so opacity modifiers stand in for a dedicated fill token.
  success: 'bg-signal-success/10 text-signal-success-text border border-signal-success/20',
  alert: 'bg-signal-alert/10 text-signal-alert-text border border-signal-alert/20'
}

// No literal copy lives inside this component — every label comes from the call site
// via content/*.json, keeping CLAUDE.md's no-hardcoded-marketing-text rule structural.
export default function Badge({ variant = 'neutral', className, children, ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
