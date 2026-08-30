# 02 — Business Model

> Synthèse de `docs/source-material/business-model-feedback-chatgpt.md`, avec distinction entre ce qui est retenu comme hypothèse de travail et ce qui reste à tester. Ce document alimente directement `content/pricing.json`.

## Modèle retenu : B2B2C

```
Patient ──────────────► gratuit (acquisition)
                             │
                             ▼
                          AiBani
                             │
                             ▼
Professionnel / Établissement ─► abonnement SaaS (monétisation)
```

Le patient est l'audience et le moteur de croissance ; le professionnel est le client payeur. Ce point est confirmé indépendamment par les deux analyses sources et devient un principe non négociable de l'architecture du site : **ne jamais faire payer le patient**, **toujours pousser la conversion côté établissement**.

## Grille d'offres — décidée, ancrée sur des repères de marché réels

> Décision validée le 2026-08-29. Voir `docs/decisions/0003-pricing-benchmarked-tiers.md` pour le détail du benchmark (Phénix, KiboERP, Clinicaa, Doctolib) et le raisonnement complet.

| Offre | Prix | Pour qui | Inclus (au-delà de Connect) |
|---|---|---|---|
| **AiBani Connect** | 0 FCFA | Tout établissement | Profil, présence réseau, RDV, agenda, disponibilités, gestion de base des utilisateurs |
| **AiBani Cabinet** | **25 000 FCFA/mois pour 1 praticien, + 10 000 FCFA/mois par praticien supplémentaire** (jusqu'à 5 praticiens, 65 000 FCFA/mois max) | Cabinet individuel ou de groupe, centre spécialisé | + patients, dossiers, consultations, ordonnances, caisse, facturation, Mobile Money, statistiques de base |
| **AiBani Clinic** | 180 000 FCFA/mois | Clinique, établissement structuré | + multi-utilisateurs, rôles/permissions, hospitalisation, laboratoire, pharmacie, facturation avancée, rapports |
| **AiBani Groupe** | Sur devis (repère interne ~400 000-500 000 FCFA/mois) | Réseaux, grands établissements, institutions | + multi-sites, intégrations, API, reporting personnalisé, support dédié, option d'hébergement sur site |

**Le saut trop abrupt identifié par le diagnostic (30k → 150k → 500k) est résolu par la tarification au praticien** plutôt que par un palier nommé supplémentaire : un cabinet de 3 praticiens paie 45 000 FCFA/mois, ce qui comble progressivement l'écart avec Clinic sans ajouter un nom de palier de plus à maintenir.

**Point de vigilance conservé du feedback** : le prix Clinic ne doit jamais être indexé uniquement sur le nombre de lits (deux cliniques de taille comparable peuvent avoir des volumes très différents) — il reste positionné comme dépendant d'utilisateurs/sites/modules/volume, cf. `content/pricing.json`.

**Pourquoi "Groupe" et non "Enterprise"** : "Enterprise" est un terme SaaS générique importé du B2B tech, pas du vocabulaire santé. "Établissement" et "Réseau" étaient déjà réservés ailleurs dans le site (le palier gratuit crée aussi un "établissement" ; "réseau AiBani" désigne le réseau patient-professionnel gratuit) — les utiliser aurait créé une collision de sens. "Groupe" évite les deux problèmes et correspond à un usage reconnu du secteur santé francophone ("groupe hospitalier", "groupe de cliniques").

Ces prix restent des **hypothèses commerciales à valider sur le terrain**, désormais mieux informées par le marché réel plutôt que par intuition seule — pas des tarifs figés définitivement.

## Architecture modulaire (au-delà des 4 tiers)

Modules additionnels activables indépendamment du tier de base : Laboratoire, Pharmacie, Facturation avancée, Assurance, Hospitalisation, Imagerie, Téléconsultation, IA (productivité administrative), API.

Conséquence directe pour le site : chaque module doit pouvoir apparaître/disparaître du comparatif de pricing et des pages solutions **sans modification de code** — uniquement en éditant `content/pricing.json` et `content/segments/*.json`.

## Segmentation commerciale (ordre de priorité)

1. Cabinets médicaux privés (marché initial, Cotonou).
2. Cliniques privées.
3. Laboratoires / centres d'imagerie.
4. Pharmacies.
5. Hôpitaux et grands réseaux (phase ultérieure).

Chaque segment doit avoir sa propre page (`/solutions/cabinet`, `/solutions/clinique`, etc.) avec un message spécifique — pas une page générique "pour tous les professionnels de santé". Voir `03-information-architecture.md` et `content/segments/`.

## Rôle de l'IA dans le discours commercial

Positionnement retenu : **productivité administrative**, jamais **substitution du jugement médical**.

À mettre en avant : résumé de consultation sous contrôle du professionnel, aide à la rédaction, classement/recherche de documents, transcription, rappels intelligents, analyse de statistiques.

À proscrire dans le copywriting : toute formulation suggérant qu'AiBani "diagnostique" ou "remplace" un professionnel de santé.

## KPI à instrumenter (voir aussi `09-analytics-tracking.md`)

Le KPI n°1 n'est pas le téléchargement mais : **nombre de rendez-vous effectivement réalisés par mois grâce à AiBani.**

Autres KPI à suivre côté produit (informent le contenu du site, notamment `content/stats.json`, mais ne sont pas tous affichables publiquement) :
- utilisateurs actifs mensuels / hebdomadaires patients et pros
- taux de conversion gratuit → payant
- MRR, churn
- coût d'acquisition par canal
- nombre d'établissements actifs vs inscrits

**Règle stricte pour le site public** : n'afficher que des chiffres réels et vérifiables (15 000+ téléchargements patients est confirmé ; tout autre chiffre reste en `XXX` tant qu'il n'est pas confirmé, et le bloc correspondant est masqué plutôt que publié avec un placeholder — voir `.claude/skills/aibani-compliance-check`).

## Feuille de route produit (priorisation en 6 niveaux)

Cette priorisation guide **quelles pages/modules construire en premier** sur le site — inutile de construire une page "Assurance" avant que le module existe réellement.

| Niveau | Objectif | Modules |
|---|---|---|
| 1 — Acquisition | Recevoir des RDV | RDV, agenda |
| 2 — Rétention | Ancrer l'usage quotidien | Dossier patient, consultation |
| 3 — Monétisation | Premier revenu récurrent | Facturation, caisse, Mobile Money |
| 4 — Expansion établissement | Élargir l'usage interne | Personnel, pharmacie, laboratoire |
| 5 — Grands comptes | Vendre à des structures complexes | Hospitalisation, assurances, RH, intégrations |
| 6 — Différenciation | Avantage concurrentiel durable | IA, analytics avancés, API |

## Expansion géographique

Phase 1 : Bénin (product-market fit). Phase 2 : un seul nouveau marché (Côte d'Ivoire ou Togo). Phase 3 : autres marchés francophones. **Le site ne doit pas afficher de présence dans des pays où AiBani n'opère pas encore** — le sélecteur de pays dans le footer doit être piloté par `content/navigation.json` et n'afficher que les marchés réellement actifs.

**Précision confirmée (2026-08-29)** : l'application AiBani est déjà **téléchargeable dans 10 pays**, mais l'activité commerciale (réseau d'établissements actif, RDV pris) hors Bénin est en cours de démarrage, pas encore établie. Ce chiffre est donc publiable comme preuve de portée technique (`content/stats.json`, `countries-available`), mais **ne doit jamais être présenté comme une preuve de présence commerciale multi-pays** — `content/navigation.json` (`activeCountries`) reste volontairement limité au Bénin tant qu'un réseau actif n'est pas confirmé ailleurs.

## Décisions tranchées (anciennement contradictions à arbitrer)

- **Grille de prix** : résolue le 2026-08-29 — voir la section "Grille d'offres" ci-dessus et `docs/decisions/0003-pricing-benchmarked-tiers.md`. Le document business model proposait des montants (30k/150k) différents de ceux du diagnostic (30k/150k/500k, palier intermédiaire suggéré) ; la version retenue s'appuie sur un benchmark de marché réel plutôt que sur l'un ou l'autre document seul.
- Le document business model suggère un **budget d'allocation type** (produit, sécurité, acquisition, commercial, marketing, réserve) — pertinent pour votre plan d'affaires mais **hors périmètre du site web** ; conservé ici pour mémoire, non traduit en contenu public.
