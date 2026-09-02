import React from 'react'
import testimonialsContent from '../../../content/testimonials.json'
import type { TestimonialsContent } from '../../lib/types/content-types'
import Card from '../ui/Card'

const { title, testimonials } = testimonialsContent as TestimonialsContent

export default function Testimonials() {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{title}</h2>
        <div className="mt-6 space-y-4">
          {testimonials.map(t => (
            <Card key={t.id} className="p-4">
              <blockquote>
                <p className="text-ink-900">“{t.quote}”</p>
                <cite className="block mt-2 text-sm text-ink-900/70 not-italic">
                  — {t.author}
                  {t.role ? `, ${t.role}` : ''}
                </cite>
              </blockquote>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
