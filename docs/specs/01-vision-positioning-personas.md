# 01 — Vision, Positionnement, Personas

## Proposition de valeur principale

> **AiBani est le logiciel de gestion qui permet aux professionnels et établissements de santé de gérer leurs patients, leurs équipes, leurs consultations et leur activité — tout en recevant gratuitement leurs rendez-vous depuis le réseau AiBani.**

Deux faces d'un même produit :
- **AiBani Patient** → moteur d'acquisition (gratuit, réseau, découverte de professionnels).
- **AiBani Cabinet/Clinic/Groupe** → moteur de monétisation (gestion opérationnelle complète).

Cette dualité doit être visible dès la navigation principale, pas seulement expliquée en page 3.

## Personas

### 1. Patient
- **Problème** : difficulté à trouver un professionnel disponible, prise de RDV par téléphone chronophage.
- **Besoin** : trouver rapidement, prendre RDV sans appel, être rappelé/notifié.
- **Motivation** : gagner du temps, éviter l'attente.
- **Objection** : "encore une appli à télécharger", confiance dans les données de santé.
- **Déclencheur** : besoin de RDV immédiat, recommandation d'un proche ou d'un établissement déjà sur AiBani.
- **Bénéfice attendu** : RDV pris en quelques clics, rappels automatiques.

### 2. Médecin / praticien indépendant (cabinet individuel)
- **Problème** : agenda papier ou Excel, appels incessants, pas de vision claire de l'activité.
- **Besoin** : centraliser agenda + dossier patient + facturation basique.
- **Motivation** : réduire le temps administratif, professionnaliser son cabinet.
- **Objection** : prix vs valeur perçue tant que le RDV de base est gratuit ; peur de la complexité d'adoption.
- **Déclencheur** : volume de patients qui dépasse ce que le papier/Excel permet de gérer sereinement.
- **Bénéfice attendu** : "je ne peux plus travailler sans."

### 3. Gestionnaire de clinique / centre de santé
- **Problème** : coordination de plusieurs praticiens et services, facturation dispersée, absence de reporting.
- **Besoin** : multi-utilisateurs, rôles/permissions, statistiques, facturation consolidée.
- **Motivation** : piloter l'activité, réduire les pertes (impayés, créneaux vides).
- **Objection** : migration des données existantes, formation de l'équipe, budget validé en comité.
- **Déclencheur** : croissance de la clinique, ouverture d'un nouveau service.
- **Bénéfice attendu** : visibilité en temps réel sur l'activité et les finances.

### 4. Laboratoire / centre d'imagerie
- **Problème** : suivi des demandes d'examens et des résultats dispersé.
- **Besoin** : réception de demandes, suivi de dossier, facturation.
- **Motivation** : fluidifier le lien avec les prescripteurs.
- **Objection** : produit historiquement pensé "cabinet médical", besoin de preuve d'adaptation au métier labo.
- **Déclencheur** : partenariat avec des cabinets déjà utilisateurs d'AiBani.

### 5. Pharmacie
- **Problème** : peu d'intégration numérique avec les prescripteurs.
- **Besoin** : visibilité, réception de demandes, connexion progressive à l'écosystème.
- **Motivation** : capter le flux de patients du réseau AiBani.
- **Objection** : produit pas encore mature sur ce segment (à assumer clairement — "bientôt disponible" plutôt que promesse).

### 6. Direction d'établissement / réseau (Groupe)
- **Problème** : multi-sites, reporting consolidé, intégrations avec systèmes existants.
- **Besoin** : contrat sur-mesure, API, support dédié.
- **Motivation** : moderniser un réseau, réduire les coûts opérationnels à l'échelle.
- **Objection** : sécurité, conformité réglementaire, réversibilité (peur du lock-in).
- **Déclencheur** : mandat de digitalisation, appel d'offres, opportunité institutionnelle (OMS, bailleurs — cf. contexte Gambie/AI4SB).

### 7. Assureur / institution / bailleur (secondaire, à ne pas cibler dès la Phase 1 mais à garder en tête dans l'architecture)
- **Besoin** : données de santé structurées, tableaux de bord population, partenariat programme.
- Pertinent pour une future page `/partenaires` ou `/institutions` — **non prioritaire pour le lancement**.

## Funnel

```
Visiteur
  ↓ (comprend la proposition de valeur en < 5 secondes)
Prospect
  ↓ (identifie son persona : patient ou professionnel/établissement)
Inscription
  ↓ (patient : compte gratuit / pro : création établissement gratuite)
Activation
  ↓ (premier RDV reçu / premier agenda configuré)
Utilisateur actif
  ↓ (usage régulier de la gestion de base gratuite)
Client payant
  ↓ (conversion vers Cabinet/Clinic — déclenchée par la friction du gratuit : "je veux le dossier patient, la facturation")
Client fidèle
  ↓ (multi-module, multi-site, renouvellement 12-36 mois)
```

Le **KPI de référence n'est pas le téléchargement mais le nombre de rendez-vous effectivement honorés par mois** — c'est la métrique la plus proche de la valeur économique créée (cf. `02-business-model.md`).

## CTA principaux et secondaires

| Contexte | CTA primaire | CTA secondaire |
|---|---|---|
| Hero (visiteur pro) | Créer mon établissement gratuitement | Demander une démonstration |
| Hero (visiteur patient, si page dédiée) | Trouver un professionnel | Télécharger l'application |
| Page tarifs — Free | Créer mon établissement gratuitement | — |
| Page tarifs — Cabinet | Essayer gratuitement 30 jours | Parler à un expert |
| Page tarifs — Clinic | Demander une démonstration | — |
| Page tarifs — Groupe | Parler à un expert AiBani | — |
| CTA final de page | Créer mon établissement gratuitement | Demander une démonstration |

Règle de cohérence : un CTA garde le même libellé du bouton jusqu'à l'écran de confirmation ("Créer mon établissement gratuitement" → titre de page → message de confirmation cohérent). Évite "Nous contacter" comme CTA par défaut : trop passif (repris du diagnostic, point 11).

## Structure de la homepage — décidé

**Accueil unique orienté professionnel** (`/`), avec un lien "Vous êtes patient ?" visible dans la navigation secondaire, renvoyant vers `/patients`. Décision validée le 2026-08-29 — voir `docs/decisions/0002-single-homepage-professional-first.md`. Aucune bifurcation ("Vous êtes... Patient / Professionnel ?") avant d'atteindre le contenu : le visiteur arrive directement sur le message professionnel, le lien patient reste une échappatoire discrète et non un mur de choix.
