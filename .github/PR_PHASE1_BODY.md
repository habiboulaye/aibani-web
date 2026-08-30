Titre: Phase 1: scaffold Next.js + TS + Tailwind

Résumé

Prépare la transition vers Phase 1 en ajoutant les ADRs de Phase 0, la checklist de handoff, les logs de validation, et le plan de scaffolding Phase 1. Ce patch ne contient que de la documentation et un plan — pas d’implémentation de pages ou de dépendances front‑end lourdes.

Changements ajoutés

- ADRs: docs/decisions/0004-phase0-acceptance.md, docs/decisions/0005-domain-and-legal.md
- Checklist: docs/checklists/phase-0-handoff.md
- Logs: logs/check-placeholders.log, logs/check-legal-claims.log
- Plan Phase 1: docs/decisions/0006-phase1-scaffold-plan.md

Checklist de revue

- [ ] Product: valider contenu & présence des fichiers requis
- [ ] Legal: valider formulations légales (voir 0005) et confirmer texte autorisé pour mentions APDP/agréments
- [ ] Marketing: vérifier claims marketing et absence de placeholders
- [ ] Ops: confirmer preuve d’enregistrement du domaine `aibani.health` dans 0005
- [ ] Final: toutes les validations OK → merger et passer à Phase 1

Comment reviewer

- Lire les fichiers listés ci‑dessus et répondre par un commentaire `Approved` ou `Request changes` avec précisions.
- Pour approbation formelle, poster un commentaire contenant `Approved — <Prénom Nom> (<rôle>)`.

Tests / vérifications locales

- Vérifier JSON: `jq . content/*.json`
- Consulter logs: `cat logs/check-placeholders.log` `cat logs/check-legal-claims.log`

Branch / PR

- Branch: phase1/scaffold-nextjs
- PR target: main

Prochaine étape après merge

- Implémenter le scaffold technique (package.json, tsconfig, tailwind, stubs) via PRs ciblées listées dans 0006.

Merci — taggez Product, Legal, Marketing et Ops comme reviewers.