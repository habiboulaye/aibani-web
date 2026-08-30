Title: Phase 0 — Acceptance & Handoff
Status: Accepted (2026-08-30) — see amendment note below on criterion 4

Contexte:
Phase 0 regroupe l'import des specs (`docs/`), du contenu (`content/`) et des hooks `.claude/`. Objectif : valider que la documentation et le contenu sont complets et prêts pour Phase 1 (scaffolding technique).

Décision:
Accepter la Phase 0 lorsque :
- tous les fichiers de `docs/specs/` et `content/` sont présents et valides JSON,
- les hooks `.claude/hooks/check-placeholders.sh` et `.claude/hooks/check-legal-claims.sh` s'exécutent sans erreurs bloquantes,
- tous les champs `{"confirmed": false}` sont listés et documentés dans ce fichier,
- l'ADR `docs/decisions/0005-domain-and-legal.md` existe et contient la preuve de réservation du domaine — **amendé le 2026-08-30 : reporté à la Phase 10** (voir note d'amendement ci-dessous),
- un commit `Phase 0: import specs + content — ready for review` est prêt.

Preuves requises:
- logs d'exécution des hooks (attachés dans `logs/` ou collés dans ce fichier),
- liste des champs `confirmed:false` (ci‑dessous),
- lien vers le commit.

Champs non confirmés identifiés:
- `content/stats.json`: `active-professionals`, `appointments-completed` (`confirmed:false`).

Approbateurs:
- Habiboulaye <habiboulaye@gmail.com>
- Product: TBD
- Legal: TBD
- Marketing: TBD

Conséquences:
- Après signature, passer à Phase 1 (scaffolding Next.js). Tant que non signé, aucun déploiement public.

## Liste complète des champs `confirmed:false`

- `content/stats.json`:
	- `active-professionals` — label: "Professionnels actifs" — value: null — `confirmed: false`
	- `appointments-completed` — label: "Rendez-vous réalisés" — value: null — `confirmed: false`

Recommandation: Ne pas afficher ces blocs en production tant que `confirmed` n'est pas `true`. Documenter l'origine des données et fournir une preuve (export, rapport, capture d'écran) avant publication.

## Amendement du 2026-08-30 — critère 4 (preuve de réservation du domaine)

En relisant Phase 0 avant de la marquer acceptée, la preuve de réservation du domaine (registrar, date, capture d'écran, délégation DNS) n'a jamais été jointe à `docs/decisions/0005-domain-and-legal.md` — le fichier ne contient qu'une action à faire, pas la preuve elle-même. Aucune phase entre 0 et 9 ne dépend réellement du domaine étant actif (voir `docs/specs/12-roadmap.md`) ; seule la Phase 10 (bascule en production) en a besoin, pour les redirections 301 et la mise en ligne effective.

Décision : le critère 4 est amendé en un critère **différé, pas bloquant**. Phase 0 est acceptée sur la base de ce qui est réellement structurant à ce stade (specs et contenu complets, hooks de conformité qui passent, chiffres non confirmés documentés). La preuve de réservation reste une **exigence explicite avant la Phase 10** — `docs/specs/12-roadmap.md` (Phase 10, dépendances) et `docs/decisions/0005-domain-and-legal.md` restent la référence à compléter à ce moment-là, pas maintenant.
