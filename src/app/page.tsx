import React from 'react'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-xl font-semibold">Bienvenue sur AiBani</h3>
        <p className="mt-3 text-slate-600">Prototype de la Phase 1 — continuer l'implémentation des sections.</p>
      </main>
      <Testimonials />
      <CTA />
    </>
  )
}
