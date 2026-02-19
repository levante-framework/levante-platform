# Pipeline Contract Fixture Authoring Guide

This guide documents how fixture examples are created/selected for the
pipeline contract and how to update them safely.

## Where fixture examples come from

Fixtures are not random hand-written rows. They are derived from expected
pipeline shapes and boundary payloads, with anonymized IDs and minimal row
counts for deterministic validation.

Primary sources:
- `schema_tools/PIPELINE_DATA_CONTRACT.json` (declares source scripts + required fields)
- `levante-pilots` stage scripts referenced in the contract:
  - `01_fetch_data/fetch_task_data.qmd`
  - `02_score_data/score_general.qmd`
  - `02_score_data/combine_scores.qmd`
  - `03_*` and `04_*` outputs
- Firebase boundary payload expectations in:
  - `boundary_dashboard_to_database_client.json`
  - `boundary_database_client_to_functions.json`
  - `boundary_functions_to_data_validator.json`
  - `boundary_data_validator_to_pilots.csv`

## Selection principles

When selecting fixture examples:
- Include required columns/paths only + a few representative optional fields.
- Use anonymized deterministic IDs (`user-001`, `run-001`, etc.).
- Include values that exercise contract rules:
  - numeric fields
  - non-negative fields
  - bounded fields (for example, `rxx` between `0` and `1`)
  - uniqueness keys
- Keep fixtures small (1-5 rows) for readability and stable CI.

## Standard update workflow

1. Update or regenerate the upstream output in `levante-pilots` (if schema changed).
2. Copy representative rows into fixture CSV/JSON files in:
   - `schema_tools/pipeline-contract/fixtures/`
3. Run fixture validators:
   - `bash schema_tools/pipeline-contract/run_contract_checks.sh`
4. If CSV headers changed intentionally, sync contract columns:
   - `node schema_tools/pipeline-contract/sync_contract_from_fixtures.mjs`
   - `node schema_tools/pipeline-contract/sync_contract_from_fixtures.mjs --write`
5. Re-run checks and confirm `out/*.schema.txt` snapshots look correct.

## Provenance to include in PR description

For any fixture change, include:
- Which source script/output changed (for example, `02_score_data/combine_scores.qmd`).
- Why fixture columns/values changed.
- Contract check output from:
  - `validate_fixture_contracts.R`
  - stage-specific validators
  - `validate_pipeline_boundaries.R`

## Anti-patterns to avoid

- Adding columns not represented by current stage outputs.
- Using production identifiers or sensitive values.
- Updating fixture headers without syncing contract and validators.
- Combining multiple independent schema changes into one fixture update.
