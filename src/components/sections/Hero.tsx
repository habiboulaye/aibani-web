import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import ViewTracker from '../analytics/ViewTracker'

const { hero } = homepage as HomepageContent

export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-paper-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="font-display text-4xl font-extrabold text-ink-900">{hero.title}</h1>
        <p className="mt-4 text-lg text-ink-900/70">{hero.subtitle}</p>
      </div>
      <ViewTracker eventName="scroll_depth" props={{ section: 'hero' }} />
    </section>
  )
}
