import React from 'react'
import Hero from '../components/sections/Hero'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-xl font-semibold">Bienvenue sur AiBani</h3>
        <p className="mt-3 text-slate-600">Prototype de la Phase 1 — continuer l'implémentation des sections.</p>
      </main>
      <CTA />
    </>
  )
}
