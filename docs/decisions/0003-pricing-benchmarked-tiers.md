# ADR-0003 — Grille de prix ancrée sur benchmark de marché, Cabinet au praticien, palier Groupe

- **Date** : 2026-08-29
- **Statut** : accepté
- **Décideurs** : Ha (produit), avec recherche de benchmark concurrentiel menée en session

## Contexte

Trois versions de grille de prix coexistaient dans les documents source (prix actuels du site, version "lissée" du diagnostic, variante à 5 paliers du document business model), sans base factuelle externe pour arbitrer. Le diagnostic identifiait un saut trop abrupt entre Cabinet (30k) et Clinic (150k/500k), sans proposer de mécanisme précis pour le combler. Le nom "Enterprise" pour le palier le plus élevé posait aussi un problème de registre (terme SaaS générique, pas issu du vocabulaire santé).

## Décision

**1. Benchmark de marché réel effectué** avant de fixer les prix : Phénix (pharmacie, Bénin, 12 500 FCFA/mois flat), KiboERP (ERP généraliste + module Santé, présent au Bénin/UEMOA, ~40 000-80 000 FCFA/mois selon palier avec le module santé), Clinicaa (plateforme centre de santé, abonnement observé à 500 000 FCFA), Doctolib (France, hors marché comparable en pouvoir d'achat mais référence de structure, ~135-149 €/mois soit ~88 000-98 000 FCFA).

**2. Grille retenue** : Connect (0), Cabinet (25 000 FCFA/mois pour 1 praticien + 10 000 FCFA/praticien supplémentaire jusqu'à 5, soit 65 000 FCFA max), Clinic (180 000 FCFA/mois), Groupe (sur devis, repère interne ~400 000-500 000 FCFA/mois).

**3. Le saut Cabinet→Clinic est comblé par la tarification au praticien**, pas par un palier nommé supplémentaire (un palier intermédiaire "Practice" avait été envisagé puis écarté — voir Alternatives).

**4. Renommage "Enterprise" → "Groupe"**, pour éviter (a) un terme SaaS générique hors du vocabulaire santé, (b) une collision de sens avec "établissement" (déjà utilisé pour désigner tout client, y compris gratuit) et "réseau" (déjà utilisé pour désigner le réseau patient-professionnel gratuit).

## Alternatives considérées

- **Palier intermédiaire nommé "Practice" (~60 000 FCFA/mois)** entre Cabinet et Clinic — écarté après clarification : ajoutait un nom à comprendre et à maintenir pour un problème que la tarification au praticien résout plus simplement, sans palier supplémentaire.
- **"Établissement" ou "Réseau" comme nom de palier** — écartés pour collision de sens directe avec des termes déjà réservés ailleurs dans les specs (voir ci-dessus).
- **"Groupe Santé"** — envisagé, écarté au profit de "Groupe" seul pour la cohérence de nommage (Connect/Cabinet/Clinic sont tous des noms en un mot) ; le mot "Santé" n'apportait pas de clarté supplémentaire dans un contexte où "AiBani" préfixe déjà le nom et où l'environnement (page, comparatif, fonctionnalités) porte déjà le sens santé.
- **Garder les prix actuels du site (30k/150k/500k) sans les retoucher** — écarté, ça republie sciemment le problème de saut abrupt déjà diagnostiqué.

## Conséquences

- `content/pricing.json` : tier `cabinet` utilise un nouveau champ `pricingModel: "per-practitioner"` — tout composant de pricing doit calculer le prix affiché à partir de ces champs, jamais coder le calcul en dur (cf. `.claude/skills/aibani-pricing-sync/SKILL.md`).
- Tous les fichiers référençant l'ancien id/nom `enterprise` ont été mis à jour vers `groupe` (`content/segments/etablissement.json`, specs, skills).
- L'option d'hébergement sur site (on-premise), mentionnée lors de la question sécurité (cf. `08-security-compliance.md`), est ajoutée comme feature différenciante du tier Groupe — argument de souveraineté des données pertinent pour les grands établissements/institutions.
- Ces prix restent des hypothèses commerciales, maintenant mieux informées, à valider par des tests terrain réels (cf. `docs/specs/13-risks-and-open-questions.md`).
