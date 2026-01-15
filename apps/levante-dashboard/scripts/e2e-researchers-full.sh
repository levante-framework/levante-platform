#!/usr/bin/env bash
set -euo pipefail
set -x

# Load app-level env for CYPRESS_* / E2E_* variables
if [ -f "$(dirname "$0")/../.env" ]; then
  set -a
  . "$(dirname "$0")/../.env"
  set +a
fi

cd "$(dirname "$0")/.."

# Resolve site name (prefer CYPRESS_* then E2E_*)
SITE_NAME="${CYPRESS_E2E_SITE_NAME:-${E2E_SITE_NAME:-ai-tests}}"

echo "Resetting site: ${SITE_NAME}"
node scripts/e2e-init/reset-site.mjs --yes --force --site-name "${SITE_NAME}"

# Seed cohort and participant users; capture cohort name for the run
E2E_COHORT_NAME="$(node scripts/e2e-init/seed-users.mjs --site-name "${SITE_NAME}" 2> >(grep 'E2E_COHORT_NAME=' | tail -n1 | sed 's/.*=//'))"
export CYPRESS_E2E_COHORT_NAME="${E2E_COHORT_NAME:-}"
echo "Seeded cohort: ${CYPRESS_E2E_COHORT_NAME:-<none>}"

echo "Running researcher-docs scenario with video..."
E2E_PORT="${E2E_PORT:-5173}" \
E2E_VIDEO="${E2E_VIDEO:-true}" \
E2E_SPEC="cypress/e2e/researchers/tasks/researcher-docs-scenario.cy.ts" \
bash scripts/e2e-researchers.sh --spec cypress/e2e/researchers/tasks/researcher-docs-scenario.cy.ts

echo "Done. Videos are in: $(pwd)/cypress/videos"
