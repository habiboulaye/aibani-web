# ADR-0001 — Modèle de monétisation B2B2C (patient gratuit, professionnel payant)

- **Date** : 2026-08-29
- **Statut** : accepté
- **Décideurs** : Ha (produit), synthèse des analyses business model et diagnostic site

## Contexte
Le modèle initial envisagé faisait reposer une partie de la monétisation sur le patient (RDV gratuit puis fonctionnalités payantes côté patient). Deux analyses indépendantes (docs/source-material/) convergent vers un modèle différent.

## Décision
Le patient reste gratuit sur toute la ligne (acquisition et effet réseau). La monétisation repose exclusivement sur les professionnels et établissements (abonnement SaaS + modules). Voir docs/specs/02-business-model.md.

## Alternatives considérées
- Monétisation mixte patient + professionnel : écartée, risque de freiner l'effet réseau côté patient qui est la source de valeur pour les professionnels.
- Monétisation uniquement à l'usage (par RDV) plutôt qu'à l'abonnement : non retenue en v1, complexifie la prévisibilité de revenu pour l'établissement — à réévaluer si le modèle par abonnement plafonne.

## Conséquences
- Toute future fonctionnalité patient doit être justifiée par l'effet réseau (plus de patients → plus de valeur pour les pros), jamais par un revenu direct patient.
- Le site doit systématiquement représenter cette asymétrie (patient = simplicité/gratuité, pro = gestion/investissement) — impacte `docs/specs/01-vision-positioning-personas.md` et `content/navigation.json`.
- À revisiter si les tests commerciaux (docs/specs/13-risks-and-open-questions.md) montrent un taux de conversion gratuit→payant insuffisant pour soutenir la croissance.
