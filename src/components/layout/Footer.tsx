import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600">
        © {new Date().getFullYear()} AiBani — Tous droits réservés
      </div>
    </footer>
  )
}
