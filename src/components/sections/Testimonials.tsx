import React from 'react'

const mock = [
  { id: 't1', quote: "AiBani a transformé notre suivi patient.", author: 'Dr. A.' },
  { id: 't2', quote: "Interface simple et efficace.", author: 'Clinique B' }
]

export default function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">Témoignages</h3>
        <div className="mt-6 space-y-4">
          {mock.map(t => (
            <blockquote key={t.id} className="p-4 border rounded-md">
              <p className="text-slate-700">“{t.quote}”</p>
              <cite className="block mt-2 text-sm text-slate-500">— {t.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
