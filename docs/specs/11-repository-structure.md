# 11 — Architecture finale du repository

> Arborescence à créer par Claude Code en Phase 1 de `12-roadmap.md`. Chaque dossier a une raison d'exister — rien n'est ajouté "pour faire propre".

```
aibani-web/
├── CLAUDE.md                        # règles persistantes du projet (voir racine de ce paquet)
├── README.md                        # onboarding développeur
├── docs/
│   ├── specs/                       # les 14 fichiers de ce paquet, transférés tels quels
│   ├── source-material/             # archive des documents sources (business model, diagnostic, contenu v1)
│   └── decisions/                   # ADR — décisions et leur justification, datées
├── content/                         # DONNÉES commerciales — jamais de texte en dur dans les composants
│   ├── pricing.json
│   ├── segments/*.json
│   ├── testimonials.json
│   ├── stats.json
│   ├── faq.json
│   └── navigation.json
├── src/
│   ├── app/                         # Next.js App Router — un dossier par route de 03-information-architecture.md
│   │   └── [locale]/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── solutions/
│   │   └── forms/
│   ├── lib/
│   │   ├── types/                   # interfaces TypeScript pour content/*.json
│   │   └── content.ts               # fonctions de lecture/validation des fichiers content/
│   └── styles/                      # tokens Tailwind générés depuis 05-design-system.md
├── public/                          # assets statiques (favicons, og-images, captures produit)
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── visual/                      # captures de référence pour la régression visuelle
├── scripts/                         # scripts utilitaires (vérif contenu, génération sitemap, etc.)
├── .claude/
│   ├── skills/                      # aibani-brand-voice, aibani-pricing-sync, aibani-compliance-check
│   ├── agents/                      # business-strategist, marketing-critic, compliance-reviewer, seo-reviewer, design-reviewer
│   └── hooks/                       # scripts de vérification automatique (voir 10-testing-qa-cicd.md)
├── .github/
│   └── workflows/                   # pipeline CI/CD décrit dans 10-testing-qa-cicd.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Justification des dossiers non triviaux

- **`content/` séparé de `src/`** : c'est la décision structurante la plus importante du repo. Elle garantit que le business model peut évoluer (prix, offres, segments, langues) par simple édition de JSON, sans toucher au code des composants — c'est l'exigence n°1 du projet ("le site doit être capable d'évoluer facilement avec le business model").
- **`docs/decisions/`** : trace pourquoi une décision a été prise (ex. pourquoi ce prix d'ancrage, pourquoi cette architecture de segments) — utile dans 12-18 mois quand quelqu'un se demandera "pourquoi c'est fait comme ça".
- **`tests/visual/`** : donne à Claude Code un moyen de vérifier son propre travail sans intervention humaine à chaque micro-changement (cf. principe n°1 des best practices Claude Code).
- **`.claude/`** : versionné avec le code — toute l'équipe (et toute future session Claude Code) bénéficie des mêmes skills/agents/hooks, pas seulement la personne qui les a configurés.
