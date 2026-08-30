import React from 'react'

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold">AiBani</div>
        <nav>
          <a className="mr-4 text-sm text-slate-700" href="#">Accueil</a>
          <a className="mr-4 text-sm text-slate-700" href="#">Solutions</a>
          <a className="text-sm text-slate-700" href="#">Tarifs</a>
        </nav>
      </div>
    </header>
  )
}
