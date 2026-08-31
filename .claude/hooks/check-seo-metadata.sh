#!/usr/bin/env bash
# Hook: manual pre-commit check (see README.md)
# Objectif : vérifier que chaque route publiée définit un title ET une
# description, et que sitemap.xml / robots.txt existent.
# Justification : docs/specs/07-seo-strategy.md, docs/specs/12-roadmap.md Phase 6.
#
# Volontairement simple (grep, pas d'analyse statique profonde) — même
# philosophie que check-placeholders.sh / check-legal-claims.sh : ce script
# vérifie une présence, pas une qualité de rédaction (ça, c'est le rôle de
# l'agent seo-reviewer).
set -euo pipefail

FOUND=0

# /design-system is deliberately excluded — internal reference tool, already
# marked robots: { index: false, follow: false }, not part of the public
# marketing site (same exclusion as sitemap.ts/robots.ts).
PAGES=$(find src/app -type f -name 'page.tsx' -not -path '*/api/*' -not -path '*/design-system/*')

for f in $PAGES; do
  if ! grep -qE 'export (const metadata|(async )?function generateMetadata|const generateMetadata)' "$f"; then
    echo "❌ Aucune metadata (title/description) exportée dans $f"
    FOUND=1
    continue
  fi
  if ! grep -q 'title' "$f"; then
    echo "❌ $f exporte des metadata mais aucun champ 'title' détecté"
    FOUND=1
  fi
  if ! grep -q 'description' "$f"; then
    echo "❌ $f exporte des metadata mais aucun champ 'description' détecté"
    FOUND=1
  fi
done

if [ ! -f "src/app/sitemap.ts" ]; then
  echo "❌ src/app/sitemap.ts est absent"
  FOUND=1
fi

if [ ! -f "src/app/robots.ts" ]; then
  echo "❌ src/app/robots.ts est absent"
  FOUND=1
fi

if [ "$FOUND" -eq 1 ]; then
  echo ""
  echo "Commit bloqué : voir docs/specs/07-seo-strategy.md et docs/specs/12-roadmap.md (Phase 6)."
  exit 1
fi

echo "✅ Metadata, sitemap et robots présents sur toutes les routes."
