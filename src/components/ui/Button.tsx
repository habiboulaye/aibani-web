import React from 'react'
import Link from 'next/link'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

type Props = ButtonAsButton | ButtonAsLink

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-body-lg px-6 py-3'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-lagoon-900 text-white hover:bg-lagoon-700',
  secondary: 'border border-lagoon-900 text-lagoon-900 hover:bg-mist-200',
  tertiary: 'text-lagoon-900 hover:bg-mist-200',
  // Spec: "usage rare et délibéré" — reach for primary/secondary first.
  accent: 'bg-ember-500 text-ink-900 hover:bg-ember-600'
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

export default function Button({ variant = 'primary', size = 'md', isLoading, className, children, ...rest }: Props) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className)

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLink
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    )
  }

  const { disabled, ...buttonRest } = rest as ButtonAsButton
  return (
    <button className={classes} disabled={disabled || isLoading} aria-busy={isLoading} {...buttonRest}>
      {isLoading && (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}
