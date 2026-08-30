Title: Phase 0 — Acceptance & Handoff
Status: Proposed

Contexte:
Phase 0 regroupe l'import des specs (`docs/`), du contenu (`content/`) et des hooks `.claude/`. Objectif : valider que la documentation et le contenu sont complets et prêts pour Phase 1 (scaffolding technique).

Décision:
Accepter la Phase 0 lorsque :
- tous les fichiers de `docs/specs/` et `content/` sont présents et valides JSON,
- les hooks `.claude/hooks/check-placeholders.sh` et `.claude/hooks/check-legal-claims.sh` s'exécutent sans erreurs bloquantes,
- tous les champs `{"confirmed": false}` sont listés et documentés dans ce fichier,
- l'ADR `docs/decisions/0005-domain-and-legal.md` existe et contient la preuve de réservation du domaine,
- un commit `Phase 0: import specs + content — ready for review` est prêt.

Preuves requises:
- logs d'exécution des hooks (attachés dans `logs/` ou collés dans ce fichier),
- liste des champs `confirmed:false` (ci‑dessous),
- lien vers le commit.

Champs non confirmés identifiés:
- `content/stats.json`: `active_professionals`, `appointments_completed` (`confirmed:false`).

Approbateurs:
- Habiboulaye <habiboulaye@gmail.com>
- Product: TBD
- Legal: TBD
- Marketing: TBD

Conséquences:
- Après signature, passer à Phase 1 (scaffolding Next.js). Tant que non signé, aucun déploiement public.

## Liste complète des champs `confirmed:false`

- `content/stats.json`:
	- `active_professionals` — label: "Professionnels actifs" — value: null — `confirmed: false`
	- `appointments-completed` — label: "Rendez-vous réalisés" — value: null — `confirmed: false`

Recommandation: Ne pas afficher ces blocs en production tant que `confirmed` n'est pas `true`. Documenter l'origine des données et fournir une preuve (export, rapport, capture d'écran) avant publication.
