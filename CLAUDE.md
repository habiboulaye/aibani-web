# CLAUDE.md — aibani-web

## Contexte
Site marketing/conversion pour AiBani (HealthTech, Bénin). Modèle B2B2C : patient gratuit (acquisition), professionnel/établissement payant (monétisation). Projet greenfield — aucun code existant, le site actuel myAibani.com sert uniquement de référence de contenu (voir `docs/source-material/`).

Toujours lire `docs/specs/00-executive-summary.md` en début de session pour le contexte complet. Les specs numérotées dans `docs/specs/` font foi ; ce fichier ne répète pas leur contenu, il fixe les règles d'exécution.

## Stack
Next.js (App Router) + TypeScript strict + Tailwind CSS. Contenu commercial dans `content/*.json`, jamais en dur dans les composants. Détails et justification : `docs/specs/06-technical-architecture.md`.

## Règles de contenu — NE JAMAIS ENFREINDRE
- Aucun chiffre `XXX` ou placeholder en production — un bloc statistique non confirmé (`confirmed: false` dans `content/stats.json`) reste masqué, jamais affiché avec un texte de remplissage.
- Aucune affirmation de certification/conformité (HDS, RGPD...) sans préciser qui est certifié, par qui, sur quel périmètre. Voir `docs/specs/08-security-compliance.md`.
- Aucun témoignage gabarit publié — `content/testimonials.json` reste vide tant que de vrais témoignages avec accord explicite n'existent pas.
- Toute fonctionnalité non disponible sur tous les segments porte la mention "selon l'offre" / "selon configuration" / "bientôt disponible".
- Les prix affichés restent des hypothèses de test ("à partir de") tant que `docs/specs/13-risks-and-open-questions.md` (point 2) n'est pas tranché.

## Workflow
- Une phase de `docs/specs/12-roadmap.md` = une session, en `plan mode`. Ne pas enchaîner plusieurs phases dans un seul tour.
- Chaque décision de conception s'écrit dans `docs/decisions/` (format ADR, voir `docs/decisions/TEMPLATE.md`), pas seulement dans la réponse de chat.
- Le contenu vit dans `content/*.json`, typé par `src/lib/types/`. Un composant de `src/components/sections/` ou `solutions/` ne contient jamais de texte en dur.
- Avant de committer : lancer le hook `check-placeholders` et `check-legal-claims` (voir `.claude/hooks/`).

## Definition of Done (par section/page)
Voir `docs/specs/10-testing-qa-cicd.md`. Résumé : contenu depuis `content/*`, aucun placeholder, typecheck + lint OK, tests E2E du parcours concerné OK, contrôle d'accessibilité sans erreur bloquante, capture d'écran revue, Core Web Vitals dans les cibles.

## Choses à ne jamais faire
- Ne jamais écrire de texte marketing en dur dans un composant `sections/` ou `solutions/` — toujours via `content/*.json`.
- Ne jamais committer de secret ou clé d'API — variables d'environnement uniquement.
- Ne jamais supprimer le focus clavier visible pour des raisons esthétiques.
- Ne jamais afficher un module/segment comme disponible partout s'il ne l'est pas (voir `content/segments/pharmacie.json` pour l'exemple de statut `network-only` : présence réseau réelle et confirmée, module de gestion avancée encore en construction).
- Ne jamais fusionner une PR sans preview validée (voir `docs/specs/10-testing-qa-cicd.md`).

## Commandes utiles
```
npm run dev          # serveur local
npm run build         # build de production
npm run typecheck     # tsc --noEmit
npm run lint
npm run test           # unit + composants
npm run test:e2e       # Playwright
```

## Skills, Subagents, Hooks disponibles
Voir `.claude/skills/`, `.claude/agents/`, `.claude/hooks/`. Invoquer `marketing-critic` et `compliance-reviewer` avant de considérer une page de contenu comme terminée.
