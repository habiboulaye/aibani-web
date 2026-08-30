# 13 — Risques et décisions à valider

## Top 10 des risques

1. **Publier une affirmation de conformité imprécise** — largement mitigé : la formulation hébergement/APDP est désormais fixée dans `08-security-compliance.md`. Reste un point résiduel : confirmer juridiquement le statut exact de l'agrément APDP (tacite ou non) avant d'utiliser une formulation plus forte que "dossier déposé avec accusé de réception".
2. **Publier des statistiques non confirmées** — largement mitigé : 4 chiffres sont désormais confirmés dans `content/stats.json` (utilisateurs, centres de santé, pharmacies, pays de téléchargement). Les blocs "professionnels actifs" et "rendez-vous réalisés" restent masqués tant qu'ils ne sont pas fournis.
3. **Sur-scoper la v1** : vouloir construire les pages de tous les segments et modules avant que le contenu (surtout pharmacie, moins mature) soit prêt. Mitigé par le phasage de `12-roadmap.md`, mais demande de la discipline pour ne pas anticiper.
4. **Rétrofit i18n coûteux** si la structure `[locale]` n'est pas posée dès la Phase 1 même en français seul. Mitigé techniquement, à ne pas sauter par gain de temps apparent.
5. **Performance sur connexions mobiles lentes** (marché béninois) si les optimisations (§07, §06) ne sont pas vérifiées en conditions réelles et pas seulement en local.
6. **Confusion patient/professionnel** si la séparation des deux audiences n'est pas assez marquée dans la navigation — c'était déjà le principal défaut du site actuel selon le diagnostic. Mitigé par la décision n°1 (accueil unique orienté pro + lien patient discret).
7. **Lancer sans démonstration vidéo** — **résolu** : la vidéo est déjà prête pour la V1 (confirmé 2026-08-29), un remaniement reste possible ultérieurement si besoin mais ne bloque pas le lancement.
8. **Gratuit perçu comme suffisant** : le plan gratuit est généreux (nécessaire pour l'effet réseau), donc la différenciation payant/gratuit doit rester extrêmement lisible sur `/tarifs`, sous peine de plafonner la conversion.
9. **Décisions de pricing encore hypothèses de test**, pas des tarifs figés — désormais mieux informées par un benchmark de marché réel (`docs/decisions/0003-pricing-benchmarked-tiers.md`), mais toujours à valider par des tests commerciaux réels. Le contenu doit porter une nuance ("à partir de") cohérente avec ce statut.
10. **280+ pharmacies "connectées" pourrait être mal compris** comme "clients payants du module de gestion pharmacie" alors qu'il s'agit de présence réseau gratuite — la formulation dans `content/segments/pharmacie.json` distingue explicitement les deux ; vigilance à maintenir sur toute réutilisation de ce chiffre ailleurs sur le site.

## Décisions tranchées

| # | Décision | Choix retenu | Date | Détail |
|---|---|---|---|---|
| 1 | Structure de la homepage | **Option A — accueil unique orienté professionnel**, avec lien discret "Vous êtes patient ?" vers `/patients` | 2026-08-29 | `docs/decisions/0002-single-homepage-professional-first.md` |
| 2 | Grille de prix | **4 paliers, benchmarkés sur le marché réel** : Connect (0), Cabinet (25k + 10k/praticien supp., max 65k), Clinic (180k), **Groupe** (sur devis, ~400-500k repère interne). Renommage "Enterprise" → "Groupe". | 2026-08-29 | `docs/decisions/0003-pricing-benchmarked-tiers.md`, `content/pricing.json` |
| 3 | Statut hébergement/certification | Hostinger (certifié ISO/IEC 27001) + option on-premise ; dossier APDP déposé avec accusé de réception (formulation prudente, sans agrément tacite affirmé) | 2026-08-29 | `docs/specs/08-security-compliance.md` |
| 4 | Chiffres réels disponibles | 15 000+ utilisateurs, 540+ centres de santé connectés, 280+ pharmacies connectées, application disponible dans 10 pays (portée, pas réseau actif) | 2026-08-29 | `content/stats.json` |
| 5 | Témoignages | Pas encore sollicités, prévu ultérieurement sans échéance — `content/testimonials.json` reste vide. En revanche, un signal de confiance institutionnel réel est disponible et intégré : autorisation du CNOPB (Ordre des Pharmaciens du Bénin) de démarcher les pharmaciens. | 2026-08-29 | `content/trust-signals.json`, `docs/source-material/2026-07-16_cnopb-autorisation-pharmaciens.pdf` |
| 6 | Vidéo de démonstration | Déjà prête pour la V1 — remaniement possible ultérieurement si besoin, ne bloque pas le lancement | 2026-08-29 | `docs/specs/04-content-pages.md`, page `/demo` |
| 7 | Outil analytics | **Plausible** (pas de campagne Google Ads prévue, donc pas d'avantage à GA4) | 2026-08-29 | `docs/specs/09-analytics-tracking.md` |
| 8 | Numéro de support local | **+229 01 54 04 71 70** (Bénin, prioritaire) affiché à côté du numéro français existant | 2026-08-29 | `content/navigation.json`, `docs/specs/04-content-pages.md` |
| 9 | Domaine et bascule | **`aibani.health`** (disponibilité à confirmer) remplace **définitivement** myAibani.com, avec redirections 301 page à page maintenues 6-12 mois | 2026-08-29 | `docs/specs/07-seo-strategy.md`, `docs/specs/12-roadmap.md` (Phase 10) |
| 10 | Périmètre linguistique | **Français + Anglais actifs au lancement.** Arabe en priorité, puis Espagnol selon les opportunités (roadmap, pas au lancement) | 2026-08-29 | `content/navigation.json`, `docs/specs/06-technical-architecture.md`, `07-seo-strategy.md`, `03-information-architecture.md` |

## Décisions qui nécessitent réellement votre arbitrage

**Aucune — toutes les décisions bloquantes de la Phase 3 sont désormais tranchées** (2026-08-29). Il reste deux points de vigilance mineurs, non bloquants, à garder à l'esprit pendant l'implémentation :

1. **Confirmer la disponibilité effective de `aibani.health`** chez un registrar avant de s'engager (cf. décision n°9).
2. **Confirmation juridique du statut exact de l'agrément APDP** (tacite ou non) avant d'utiliser une formulation plus forte que "dossier déposé avec accusé de réception" (cf. décision n°3, `08-security-compliance.md`).

Ce document reste vivant : toute nouvelle question ouverte pendant l'implémentation (Claude Code ou vous) doit y être ajoutée, pas laissée implicite dans une conversation.

**Statut au 2026-08-29 : plus aucun blocage pour la Phase 3.** Claude Code peut avancer sur l'ensemble de `12-roadmap.md`, y compris le contenu réel de la homepage — les 10 décisions qui conditionnaient cette phase sont toutes tranchées.
