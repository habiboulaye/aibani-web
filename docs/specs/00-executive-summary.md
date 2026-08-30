# 00 — Executive Summary

> Statut : v1 — à valider avant transmission à Claude Code.
> Source : synthèse de `docs/source-material/` (feedback business model, diagnostic site, contenu homepage v1) + analyse complémentaire.

## Le constat en une phrase

**Le produit AiBani est plus avancé que ce que le site actuel raconte, et le site futur doit devenir un outil de conversion B2B2C, pas une vitrine de fonctionnalités.**

## Les 10 décisions structurantes

1. **Repositionnement du message principal** : passer de *"gérez les rendez-vous de vos patients"* à *"le logiciel de gestion qui fait grandir votre établissement de santé"*. Le RDV gratuit est un canal d'acquisition, pas le produit.
2. **Modèle B2B2C explicite dans l'architecture du site** : deux publics (patient / professionnel) doivent être séparés dès la navigation, pas mélangés dans un message générique.
3. **Le site est un produit logiciel, pas une landing page jetable** : contenu et design séparés du code (fichiers de données versionnés), composants réutilisables, pas de texte en dur dans les composants.
4. **Architecture modulaire qui reflète l'offre modulaire** (Connect → Cabinet → Clinic → Groupe + modules Laboratoire/Pharmacie/Facturation/IA) : chaque page "solution" et chaque tier de pricing doivent pouvoir être ajoutés sans reconstruire le site.
5. **Repartir de zéro techniquement, réutiliser le contenu.** Aucun code existant à auditer ; le site actuel (myAibani.com) sert uniquement de référence de contenu, de structure et de ton — voir `docs/source-material/`.
6. **Pas d'affirmation non vérifiable** : aucun chiffre `XXX` en production, aucune formulation de conformité ("Certification HDS & RGPD") sans preuve juridique précise. C'est une règle de contenu qui doit être techniquement imposée (voir `.claude/skills/aibani-compliance-check`).
7. **Stack pensée pour la vitesse d'évolution du contenu commercial**, pas seulement pour la vitesse de build initial — le business model va changer (prix, offres, pays, langues), le site doit encaisser ce changement sans refonte.
8. **Français et anglais au lancement, arabe puis espagnol en fonction des opportunités.** Décidé le 2026-08-29 : FR+EN dès le lancement (pas de français seul), l'architecture de routing prévoit l'internationalisation pour ajouter arabe et espagnol sans rétrofit.
9. **La preuve sociale et la démonstration produit sont les deux plus gros manques actuels** (scores 3/10 et 5/10 dans le diagnostic) — ce sont des priorités de contenu, pas seulement de design.
10. **Rien n'est codé avant validation des specs.** Ce paquet de documents est la validation humaine attendue avant d'ouvrir Claude Code sur un vrai dépôt.

## Ce qui est déjà solide et doit être conservé

- La mécanique de croissance : patient gratuit → réseau → professionnel payant. C'est la bonne mécanique, confirmée indépendamment par les deux analyses.
- Le contenu de `homepage-content-v1-recommandee.md` est une bonne base de copywriting — il sert de référence, pas de dogme (voir `04-content-pages.md`).
- La grille de prix Cabinet/Clinic/Groupe, désormais ancrée sur des repères de marché réels (Phénix, KiboERP, Clinicaa, Doctolib — voir `docs/decisions/0003-pricing-benchmarked-tiers.md`), avec un Cabinet à prix variable selon le nombre de praticiens.
- "Mise en place accompagnée" comme argument de différenciation contre la peur du changement — sous-exploité, à mettre en avant.

## Ce qui doit changer en priorité (ordre d'impact)

1. Hero et proposition de valeur (repositionnement établissement > RDV).
2. Preuve sociale (15 000+ patients, témoignages, logos clients).
3. Démonstration produit (vidéo 60–90s du parcours complet).
4. Structure de l'offre en 6 catégories de fonctionnalités plutôt qu'une liste plate.
5. Précision juridique sur les affirmations de sécurité/conformité.

## Ce que ce paquet de documents contient

| Fichier | Répond à |
|---|---|
| `01-vision-positioning-personas.md` | Pour qui, pourquoi, quel message |
| `02-business-model.md` | Offres, tarifs, segmentation, KPI |
| `03-information-architecture.md` | Arborescence du site |
| `04-content-pages.md` | Contenu par page (au-delà de la homepage) |
| `05-design-system.md` | Direction visuelle, tokens |
| `06-technical-architecture.md` | Stack et choix techniques |
| `07-seo-strategy.md` | SEO |
| `08-security-compliance.md` | Sécurité, RGPD, formulations légales |
| `09-analytics-tracking.md` | Mesure et funnel |
| `10-testing-qa-cicd.md` | Qualité et déploiement |
| `11-repository-structure.md` | Arborescence finale du repo |
| `12-roadmap.md` | Phasage d'implémentation |
| `13-risks-and-open-questions.md` | Risques + décisions qui vous reviennent |
| `14-mcp-recommendations.md` | Quels MCP connecter, et quand |

## Prochaine étape

Valider ou amender ce document et les 13 qui suivent, puis transmettre l'ensemble (+ `CLAUDE.md`, `.claude/`, `content/`) à Claude Code pour démarrer par la **Phase 0** de `12-roadmap.md`.
