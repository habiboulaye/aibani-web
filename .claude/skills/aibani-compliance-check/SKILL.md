---
name: aibani-compliance-check
description: Vérifie qu'un contenu (page, section, composant) respecte les règles légales/factuelles non négociables du projet AiBani avant publication. Utiliser avant de considérer terminée toute page contenant des chiffres, des affirmations de sécurité/conformité, des témoignages, ou des descriptions de fonctionnalités.
---

# Contrôle de conformité du contenu AiBani

Référence complète : `docs/specs/08-security-compliance.md`. Ce skill encode les règles sous forme de checklist actionnable.

## Checklist avant publication d'une page/section

1. **Chiffres** — pour chaque statistique affichée, vérifier son entrée dans `content/stats.json` : si `confirmed: false`, le bloc ne doit PAS apparaître dans le rendu (ni en placeholder `XXX`, ni masqué visuellement mais présent dans le DOM).
2. **Certification/conformité** — toute mention de sécurité doit répondre aux 5 questions : qui est certifié ? quelle certification ? quel périmètre ? quel organisme ? quelle date/statut ? Si une seule réponse manque, reformuler en langage de "mesures mises en œuvre" plutôt que de "certification" (cf. formulations du bloc §18 de `docs/source-material/homepage-content-v1-recommandee.md`, déjà conformes — s'en inspirer).
3. **Témoignages** — vérifier que chaque témoignage affiché existe dans `content/testimonials.json` avec un nom, une fonction et un établissement réels. Aucun texte entre crochets (`[Nom du professionnel]`) ne doit atteindre la production.
4. **Disponibilité des fonctionnalités** — toute fonctionnalité listée sur une page segment doit être croisée avec `content/pricing.json` (`features{}.availabilityNote`) et `content/segments/[segment].json` (`maturity`). Si `maturity: "coming-soon"` ou `"network-only"`, la page doit le refléter explicitement et distinguer ce qui est déjà réel (ex. présence réseau) de ce qui ne l'est pas encore (ex. module de gestion) — cf. `content/segments/pharmacie.json`, où les deux coexistent sans se contredire.
5. **Signaux de confiance institutionnels** (`content/trust-signals.json`) — une autorisation administrative (ex. autorisation de démarchage d'un ordre professionnel) n'est jamais reformulée en soutien, partenariat ou recommandation du produit. Utiliser exclusivement le champ `publicStatement` prérédigé de l'entrée concernée ; ne jamais paraphraser librement une autorisation à partir du document source — vérifier systématiquement contre la liste `doNotClaim` de l'entrée avant publication.
6. **IA** — aucune formulation suggérant un diagnostic médical automatisé ou un remplacement du professionnel de santé (cf. `aibani-brand-voice`).

## Comportement attendu si un contrôle échoue
Ne pas publier / ne pas marquer la tâche comme terminée. Signaler précisément quelle règle est enfreinte et dans quel fichier de contenu la corriger (`content/stats.json`, `content/testimonials.json`, `content/trust-signals.json`, `content/pricing.json` ou `content/segments/*.json`) — la correction se fait presque toujours dans les données, pas dans le composant.

## Lien avec l'automatisation
Ce skill formalise la logique que le hook de pré-commit `check-placeholders` et `check-legal-claims` (voir `.claude/hooks/`) applique automatiquement de façon plus grossière (recherche de motifs textuels). Le skill sert à un contrôle plus fin, notamment lors de la rédaction, avant même que le hook ne s'exécute.
