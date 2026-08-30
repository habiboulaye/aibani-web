import React from 'react'
import testimonialsContent from '../../../content/testimonials.json'
import type { Testimonial } from '../../lib/types/content-types'

const testimonials: Testimonial[] = testimonialsContent.testimonials

export default function Testimonials() {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">Témoignages</h3>
        <div className="mt-6 space-y-4">
          {testimonials.map(t => (
            <blockquote key={t.id} className="p-4 border rounded-md">
              <p className="text-slate-700">“{t.quote}”</p>
              <cite className="block mt-2 text-sm text-slate-500">
                — {t.author}
                {t.role ? `, ${t.role}` : ''}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
