import React from 'react'
import demoContent from '../../../../content/demo.json'
import type { DemoContent } from '../../../lib/types/content-types'
import { buildMetadata } from '../../../lib/seo'
import DemoRequestForm from '../../../components/demo/DemoRequestForm'

const content = demoContent as DemoContent

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata({
    locale: params.locale,
    path: '/demo',
    title: content.hero.title,
    description: content.seoDescription
  })
}

// Video section (docs/specs/04-content-pages.md) intentionally not built here —
// no product video file exists in this repo yet. Deferred, tracked in
// docs/specs/13-risks-and-open-questions.md #6, not silently dropped. The page
// ships with the request form only, which is the actual conversion mechanism.
export default function DemoPage() {
  return (
    <div>
      <section className="py-16 bg-gradient-to-b from-white to-paper-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink-900">{content.hero.title}</h1>
          <p className="mt-4 text-lg text-ink-900/70">{content.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <DemoRequestForm content={content.form} />
        </div>
      </section>
    </div>
  )
}
