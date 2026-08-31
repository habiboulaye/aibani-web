import React from 'react'
import faqContent from '../../../content/faq.json'
import type { FaqContent } from '../../lib/types/content-types'

const { title, items } = faqContent as FaqContent

// docs/specs/07-seo-strategy.md requires FAQPage structured data "sur le bloc FAQ
// de la homepage" (and on /ressources/faq, once that page exists).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}

export default function Faq() {
  return (
    <section className="py-12 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{title}</h2>
        <div className="mt-6 divide-y divide-mist-200">
          {items.map((item, index) => (
            <details key={item.id} className="group py-4" open={index === 0}>
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-medium text-ink-900 [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700">
                {item.question}
                <span aria-hidden="true" className="shrink-0 text-ink-900/50 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-ink-900/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
