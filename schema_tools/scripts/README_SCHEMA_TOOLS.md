# Scripts

## Schema docs

### Generate or update README snapshots

Dry run (default):

```
npm run schema:docs
```

Write updated snapshots:

```
npm run schema:docs:write
```

Write to multiple markdown files:

```
npm run schema:docs:write -- --out README_FIREBASE_SCHEMA.md --out docs/SCHEMA_SNAPSHOT.md
```

Write snapshot JSON:

```
npm run schema:docs:write -- --json-out docs/schema-snapshot.json
```

### Validator docs

The following files are refreshed when running `schema:docs:write`:

- `schema_tools/SCHEMA_VALIDATOR_MAPPING.md`
- `schema_tools/SCHEMA_VALIDATOR_CONTRACT.md`

## Schema integrity checks

Run integrity check against the most recent baseline (README snapshot or git base):

```
npm run schema:check
```

Verbose output:

```
npm run schema:check -- --verbose
```

Force baseline choice:

```
npm run schema:check -- --prefer-snapshot
npm run schema:check -- --prefer-git
```

Use a different base ref:

```
npm run schema:check -- --base origin/release
```

## ROAR docs

Update ROAR task docs (PA/SWR/SRE) and regenerate ERD SVGs.

Dry run (default):

```
node schema_tools/scripts/update-roar-docs.js
```

Write updates:

```
node schema_tools/scripts/update-roar-docs.js --write
```

Verbose output:

```
node schema_tools/scripts/update-roar-docs.js --write --verbose
```

## Pipeline contract artifact

Cross-repo contract for dashboard/functions/pilots compatibility:

```
schema_tools/PIPELINE_DATA_CONTRACT.json
```

Use this as the baseline for:
- upstream schema/cardinality checks in functions/dashboard PRs
- downstream column/type checks in pilots ingestion scripts

Manual fixture validation (for QA/CI) is in:

```
schema_tools/pipeline-contract/
```

Run from repository root:

```
Rscript schema_tools/pipeline-contract/validate_fixture_contracts.R
```

Stage-specific manual checks:

```
Rscript schema_tools/pipeline-contract/validate_stage02_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage03_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage03_explore_contracts.R
Rscript schema_tools/pipeline-contract/validate_stage04_papers_contracts.R
Rscript schema_tools/pipeline-contract/validate_pipeline_boundaries.R
```

Run all pipeline checks in one command:

```
bash schema_tools/pipeline-contract/run_contract_checks.sh
```

If fixtures changed intentionally, sync required contract columns from fixture headers:

```
node schema_tools/pipeline-contract/sync_contract_from_fixtures.mjs
node schema_tools/pipeline-contract/sync_contract_from_fixtures.mjs --write
```

Use the dry run first, review the diff, then run with `--write`.
