---
name: aibani-pricing-sync
description: Localise et fait évoluer les données de pricing/fonctionnalités AiBani. Utiliser dès qu'un prix, un tier, un module ou une disponibilité de fonctionnalité doit être ajouté, retiré ou modifié n'importe où sur le site (homepage, /tarifs, pages /solutions/*, comparatif).
---

# Synchronisation du pricing AiBani

## Source unique de vérité
`content/pricing.json` — structure : `tiers[]` (id, name, price, priceLabel, priceNote, featureIds[], includesTierId), `features{}` (label + availabilityNote optionnelle), `standaloneModules[]`.

Un tier "inclut" le précédent via `includesTierId` — ne jamais dupliquer la liste de features d'un tier inférieur dans un tier supérieur, toujours référencer.

## Où ces données sont consommées
- Page `/tarifs` (comparatif complet).
- Bloc pricing de la homepage (`docs/source-material/homepage-content-v1-recommandee.md`, §13-17).
- Chaque page `/solutions/[segment]` via `content/segments/[segment].json` → champ `recommendedTierId` et `highlightedFeatureIds` (sous-ensemble de `featureIds` du tier recommandé).

## Règles à respecter à chaque modification
1. Ne jamais écrire un prix en dur dans un composant `.tsx` — toujours lire depuis `content/pricing.json`.
2. Si un prix n'est pas encore figé commercialement, utiliser `price: null` + `priceLabel: "À partir de X FCFA / mois"` + `priceNote` expliquant la fourchette — jamais un chiffre unique présenté comme définitif tant que `docs/specs/13-risks-and-open-questions.md` (point 2) n'est pas tranché.
3. Une fonctionnalité qui n'est pas disponible sur tous les segments doit porter une `availabilityNote` dans `features{}` — c'est ce qui alimente les mentions "selon l'offre"/"selon configuration" affichées automatiquement par les composants pricing.
4. Ajouter un module = ajouter une entrée dans `features{}` + le référencer dans `featureIds[]` du ou des tiers concernés + éventuellement dans `standaloneModules[]` s'il est vendable indépendamment. Ne jamais créer un module "flottant" non référencé nulle part.
5. Après toute modification, vérifier que le test unitaire de propagation (`docs/specs/12-roadmap.md`, Phase 5) passe toujours — il garantit qu'un changement dans `pricing.json` se reflète partout sans édition manuelle des pages.

## Exemple de tâche typique
"Ajouter un module Téléconsultation vendable en add-on Clinic/Groupe" → ajouter `telemedicine` dans `features{}` avec son label, l'ajouter à `featureIds` de `clinic` et `groupe` dans `tiers[]`, et le retirer de `standaloneModules[]` s'il y était en `roadmap`.

## Cas particulier : tarification au praticien (tier Cabinet)

Le tier `cabinet` utilise `pricingModel: "per-practitioner"` plutôt qu'un prix fixe unique : `price` (prix de base, 1 praticien), `perAdditionalPractitioner` (coût par praticien supplémentaire), `maxPractitioners` (plafond avant bascule recommandée vers Clinic), `priceAtMaxPractitioners` (prix au plafond). Un composant pricing doit calculer le prix affiché à partir de ces quatre champs, jamais coder le calcul en dur dans le composant lui-même — si la mécanique de calcul change (ex. plafond à 8 praticiens au lieu de 5), seul ce fichier doit être modifié.
