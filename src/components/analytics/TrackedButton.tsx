'use client'

import React from 'react'
import Button from '../ui/Button'
import { trackEvent, type AnalyticsEventName } from '../../lib/analytics'

// Thin client boundary around ui/Button so Server Component sections (Header,
// Pricing, /tarifs, ...) can request tracking via plain serializable data
// props (eventName/eventProps) — a Server Component can't pass an inline
// onClick closure to a component, even a client one, since functions aren't
// serializable across that boundary.
type Props = React.ComponentProps<typeof Button> & {
  eventName: AnalyticsEventName
  eventProps?: Record<string, string>
}

export default function TrackedButton({ eventName, eventProps, ...rest }: Props) {
  return (
    <Button
      {...rest}
      onClick={() => {
        trackEvent(eventName, eventProps)
      }}
    />
  )
}
