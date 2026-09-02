import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'

const { hero } = homepage as HomepageContent

export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold">{hero.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{hero.subtitle}</p>
      </div>
    </section>
  )
}
