import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import Card from '../ui/Card'

const { features } = homepage as HomepageContent

export default function Features() {
  return (
    <section className="py-12 bg-paper-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{features.title}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.items.map(i => (
            <Card key={i.id}>
              <h3 className="font-semibold text-ink-900">{i.title}</h3>
              <p className="mt-2 text-sm text-ink-900/70">{i.description}</p>
              {i.availabilityNote && (
                <p className="mt-1 text-xs text-ink-900/70">{i.availabilityNote}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
