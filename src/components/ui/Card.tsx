import React from 'react'
import { cn } from '../../lib/cn'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  highlighted?: boolean
  children: React.ReactNode
}

// Generic visual shell only — deliberately not typed against PricingTier /
// HomepageFeatureItem / Testimonial shapes yet. Composing content-specific card
// variants belongs to the Homepage rework phase, once real section layout exists.
export default function Card({ highlighted, className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        'rounded-card border bg-white p-6 shadow-card',
        highlighted ? 'border-lagoon-900' : 'border-mist-200',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
