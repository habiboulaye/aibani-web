import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'

const { finalCta } = homepage as HomepageContent

export default function CTA({ locale }: { locale: string }) {
  return (
    <section className="py-12 bg-lagoon-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-2xl font-bold">{finalCta.title}</h2>
        <p className="mt-3">{finalCta.subtitle}</p>
        <div className="mt-6">
          {/* Inverted treatment (white fill on the section's own dark lagoon-900 bg) —
              not the ui/Button component: its shared focus ring (ember-700) is tuned
              for light backgrounds and drops to ~1.6:1 contrast here, below the 3:1
              non-text-UI minimum. A white ring is correct for this dark context instead. */}
          <a
            href={localizeHref(locale, finalCta.ctaHref)}
            className="inline-block bg-white text-lagoon-900 px-6 py-3 rounded-control font-medium hover:bg-paper-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {finalCta.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
