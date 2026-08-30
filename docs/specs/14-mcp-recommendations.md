# 14 — MCP recommandés

> Aucun MCP n'est indispensable pour démarrer (Phases 0-3). Ne pas connecter un MCP simplement parce qu'il existe.

| MCP | Utilité pour ce projet | Recommandation |
|---|---|---|
| **GitHub** | Gestion des PR, revue, preview par branche — cœur du pipeline CI/CD (`10-testing-qa-cicd.md`) | **Indispensable** dès la Phase 1 |
| **Figma** | Si des maquettes visuelles sont produites en parallèle du design system (`05-design-system.md`), permet à Claude Code de coder directement depuis le design plutôt que depuis une description texte | **Utile** — à connecter si vous produisez des maquettes ; sinon la description textuelle du design system suffit |
| **Analytics (Google Search Console / outil analytics choisi)** | Boucler SEO ↔ résultats réels une fois en production | **Utile mais tardif** — pertinent à partir de la Phase 6-7, pas avant |
| **Base de données** | Aucun besoin identifié — le site est statique/JSON, aucune base de données propre au site marketing | **Inutile** en v1 |
| **Navigateur (browser automation)** | Utile pour capturer/comparer visuellement myAibani.com actuel pendant la Phase 0, et pour les tests visuels/E2E (Playwright déjà couvre ce besoin) | **Optionnel** — Playwright en local suffit pour les tests, un MCP navigateur n'ajoute de valeur que pour l'exploration ponctuelle du site actuel |
| **Monitoring (Sentry ou équivalent)** | Remontée d'erreurs runtime une fois en production | **Utile** à partir de la Phase 10 |
| **Outils marketing (CRM, email transactionnel)** | Intégration du formulaire de démo (`06-technical-architecture.md`) | **Utile** — dépend de l'outil que vous utilisez déjà ; à trancher en Phase 7 |

## Principe

Un MCP se connecte quand une phase de `12-roadmap.md` en a un besoin concret et daté — pas en prévision vague. Cela évite d'accumuler des connecteurs qui ajoutent de la surface de risque (accès, permissions) sans usage réel.
