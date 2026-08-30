Title: Phase 1 — Scaffolding Next.js + TypeScript + Tailwind
Status: Proposed

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
- [ ] `npm run dev` démarre sans erreur
- [ ] `npm run typecheck` passe (`tsc --noEmit`)
- [ ] `npm run lint` OK
- [ ] `content/*.json` importés et typés (ex: `src/lib/types/content-types.ts`)
- [ ] `docs/decisions/0004-phase0-acceptance.md` et `0005-domain-and-legal.md` référencés

Commande recommandée pour créer la PR (locale):
```
git push -u origin phase1/scaffold-nextjs
# then create PR with GitHub CLI:
gh pr create --title "Phase 1: scaffold Next.js + TS + Tailwind" --body "See docs/decisions/0006-phase1-scaffold-plan.md" --label "phase/1"
```

Notes:
- Cette PR doit rester légère: stubs et scripts, pas d'implémentation lourde de pages.
- Tests et intégration plus avancés seront ajoutés dans des PRs suivantes.
