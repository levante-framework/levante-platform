#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "Running pipeline contract checks (stages 01-04)..."

Rscript schema_tools/pipeline-contract/validate_fixture_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage02_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage03_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage03_explore_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage04_papers_contracts.R
Rscript schema_tools/pipeline-contract/validate_pipeline_boundaries.R

echo "All pipeline contract checks passed."
