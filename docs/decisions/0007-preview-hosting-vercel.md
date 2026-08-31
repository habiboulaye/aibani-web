# ADR-0007 — Hébergement des previews PR : Vercel

- **Date** : 2026-08-30
- **Statut** : remplacé par ADR-0013 (2026-08-31 — le compte d'hébergement de preview réellement disponible côté utilisateur est Netlify, pas Vercel ; voir ADR-0013 pour la décision à jour et la correction du raisonnement ci-dessous sur le niveau de configuration réellement requis par Netlify)
- **Décideurs** : Habiboulaye <habiboulaye@gmail.com>

## Contexte
`docs/specs/10-testing-qa-cicd.md` exige un déploiement preview avec URL unique par pull request, revu par un humain (et par les subagents `marketing-critic`/`design-reviewer`) avant tout merge — règle rappelée dans `CLAUDE.md` ("Ne jamais fusionner une PR sans preview validée"). Ce point n'était pas encore tranché : seul un workflow CI de build/typecheck (`.github/workflows/ci.yml`) existait, sans aucun déploiement de preview réel.

Ce sujet est distinct de la décision d'hébergement de production déjà actée (point 3 de `13-risks-and-open-questions.md` : Hostinger, certifié ISO/IEC 27001). Vercel ne sert ici qu'aux previews par PR ; la production reste sur Hostinger sauf décision contraire ultérieure.

## Décision
Utiliser **Vercel** pour les déploiements preview par pull request. C'est l'option zero-config pour Next.js App Router (déjà la stack du projet, cf. `06-technical-architecture.md`), ce qui évite la configuration manuelle qu'exigerait Netlify pour l'App Router.

## Alternatives considérées
- **Netlify** : supporte aussi Next.js et les previews par PR, mais demande davantage de configuration pour l'App Router. Écarté pour rester au plus simple en Phase 1.
- **Rester sans preview automatisé** (revue via `npm run dev` en local uniquement) : écarté — ne satisfait pas l'exigence de `10-testing-qa-cicd.md` d'une URL revuable sans setup local, notamment pour les revues marketing/compliance qui n'ont pas forcément l'environnement de dev.

## Mise en place (actions restantes, côté compte utilisateur)
La connexion d'un compte Vercel à un dépôt GitHub nécessite une authentification interactive (OAuth/login) qu'un agent non interactif ne peut pas réaliser à la place de l'utilisateur. Étapes à faire une fois, côté Habiboulaye :
1. Sur [vercel.com](https://vercel.com), "Add New… → Project" → importer `habiboulaye/aibani-web` (installe l'app GitHub Vercel avec accès au dépôt).
2. Laisser la détection automatique du framework Next.js (aucun `vercel.json` requis pour ce projet).
3. Une fois importé, Vercel commente automatiquement chaque PR avec son URL de preview et déploie à chaque push — pas de modification supplémentaire de `.github/workflows/ci.yml` nécessaire, les deux systèmes sont indépendants.
4. Vérifier qu'aucune variable d'environnement/secret n'est nécessaire au premier déploiement (le projet n'en utilise pas encore) ; en ajouter au fur et à mesure via le dashboard Vercel (jamais committées, cf. `CLAUDE.md`).

## Conséquences
- Chaque PR obtient une URL de preview automatique, ce qui débloque la case "Validation humaine" de la Phase 3+ de `12-roadmap.md` et la revue par `marketing-critic`/`design-reviewer` sur une URL réelle plutôt qu'en local.
- Ajoute une dépendance externe (compte Vercel) au pipeline — à revisiter si le projet bascule un jour vers un hébergement de production unifié plutôt que Hostinger + Vercel previews.
- Le déploiement de production reste sur Hostinger ; cet ADR ne change rien à `08-security-compliance.md`.
