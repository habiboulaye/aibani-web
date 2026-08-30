Title: Phase 1 — Scaffolding Next.js + TypeScript + Tailwind
Status: Accepted (2026-08-30) — the `[locale]` routing structure this plan originally called for (line 10, `src/app/[locale]/page.tsx`) had been skipped in the actual scaffold; retrofitted before acceptance, see `docs/decisions/0009-i18n-routing-retrofit.md`.

Contexte:
Phase 1 prépare la base technique du projet: Next.js (App Router), TypeScript strict, Tailwind CSS, et les types pour le contenu (`content/*.json`). Ce document décrit la checklist minimale pour la PR de scaffolding.

Objectif PR:
- Créer la structure minimale du projet pour permettre le développement (scripts `dev`, `build`, `typecheck`, `lint`, `test`).
- Ajouter `tsconfig.json`, `package.json` (scripts de base), `tailwind.config.ts`, et les dossiers `src/app`, `src/components`, `src/lib/types`.
- Ajouter un stub `src/app/[locale]/page.tsx` et un composant `src/components/ui/Button.tsx` comme exemple.

Fichiers attendus dans la PR:
- `package.json`, `tsconfig.json`, `next.config.js` (ou `next.config.mjs`), `tailwind.config.ts`
- `postcss.config.js`, `src/app/[locale]/page.tsx`, `src/components/ui/Button.tsx`
- `src/lib/types/content-types.ts` (stubs pour `content/*.json`)
- `README.md` mise à jour avec scripts et instructions locales

Checklist PR (à inclure dans la description):
- [x] `npm run dev` démarre sans erreur — vérifié le 2026-08-30
- [x] `npm run typecheck` passe (`tsc --noEmit`)
- [x] `npm run lint` OK
- [x] `content/*.json` importés et typés (ex: `src/lib/types/content-types.ts`) — couvre désormais aussi `faq.json` et `segments/*.json`, validés par `tests/unit/content-types.test.ts`
- [x] `docs/decisions/0004-phase0-acceptance.md` et `0005-domain-and-legal.md` référencés
- [x] Structure `[locale]` en place (`src/app/[locale]/`, `src/middleware.ts`) — voir `docs/decisions/0009-i18n-routing-retrofit.md`

Commande recommandée pour créer la PR (locale):
```
git push -u origin phase1/scaffold-nextjs
# then create PR with GitHub CLI:
gh pr create --title "Phase 1: scaffold Next.js + TS + Tailwind" --body "See docs/decisions/0006-phase1-scaffold-plan.md" --label "phase/1"
```

Notes:
- Cette PR doit rester légère: stubs et scripts, pas d'implémentation lourde de pages.
- Tests et intégration plus avancés seront ajoutés dans des PRs suivantes.
