# ADR-0011 — Analytics Plausible livrée inactive jusqu'à configuration réelle

- **Date** : 2026-08-31
- **Statut** : accepté
- **Décideurs** : Habiboulaye AMADOU-BOUBACAR (choix confirmé via question directe pendant la Phase 7)

## Contexte

`docs/specs/09-analytics-tracking.md` a déjà tranché l'outil (Plausible, confirmé le 2026-08-29) et `docs/specs/12-roadmap.md` (Phase 7) exige malgré tout une validation humaine avant implémentation. Au moment de construire cette phase, aucun domaine ni compte Plausible réel n'existe (auto-hébergé ou plausible.io) — même nature de manque que la vidéo `/demo` (Phase 4) ou les images Open Graph (Phase 6) : un actif externe non fourni, à ne pas fabriquer.

## Décision

Livrer toute l'infrastructure (bannière de consentement, instrumentation des événements nommés par le spec, capture UTM) dès maintenant, mais gated derrière une variable d'environnement `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` non définie par défaut. Tant qu'elle est absente, `src/components/analytics/PlausibleScript.tsx` ne rend rien : aucun script ne charge, `window.plausible` n'existe jamais, et `src/lib/analytics.ts#trackEvent` ne fait donc jamais rien non plus (aucun appel réseau, aucune donnée envoyée nulle part). Le jour où un domaine/compte réel existe, une seule variable d'environnement à renseigner — aucune modification de code.

## Alternatives considérées

- **Attendre d'avoir le compte avant de commencer la Phase 7** : rejeté — retarde tout le reste du roadmap (Phase 8 QA, etc.) pour un actif externe hors du contrôle du développement du site.
- **Utiliser un domaine Plausible de test/factice** : rejeté — enverrait de fausses données à un projet qui n'existe pas, ou pire, à un projet Plausible existant appartenant à quelqu'un d'autre si le nom choisi entre en collision.

## Conséquences

- Aucun événement analytics ne sera jamais mesuré tant que la variable n'est pas configurée — normal et attendu, pas un bug à corriger plus tard.
- La bannière de consentement s'affiche déjà (comportement UI complet, testé), même si elle n'active rien de mesurable pour l'instant — cohérent avec `docs/specs/09-analytics-tracking.md` ("bannière de consentement avant activation de tout script de mesure non essentiel").
- À revisiter : dès qu'un compte Plausible (auto-hébergé ou plausible.io) existe, définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` en production (Phase 10) et vérifier une fois en conditions réelles que les événements nommés dans `09-analytics-tracking.md` remontent correctement dans le tableau de bord Plausible.
