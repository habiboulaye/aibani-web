import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'

const { features } = homepage as HomepageContent

export default function Features() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold">{features.title}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.items.map(i => (
            <div key={i.id} className="p-4 bg-white border rounded-md">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{i.description}</p>
              {i.availabilityNote && (
                <p className="mt-1 text-xs text-slate-500">{i.availabilityNote}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
