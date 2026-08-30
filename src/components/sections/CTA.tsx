import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'

const { finalCta } = homepage as HomepageContent

export default function CTA() {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold">{finalCta.title}</h2>
        <p className="mt-3">{finalCta.subtitle}</p>
        <div className="mt-6">
          <a href={finalCta.ctaHref} className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium">
            {finalCta.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
