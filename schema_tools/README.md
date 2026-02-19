# schema_tools moved

`schema_tools` is now owned by `levante-support` at:

- `../levante-support/schema_tools`

Use the support repo for contract fixtures, validators, and ROAR task docs updates.

## Local compatibility

- Run pipeline checks from support: `bash ../levante-support/schema_tools/pipeline-contract/run_contract_checks.sh`
- Run ROAR docs update from platform: `npm run roar:docs` (this now targets support-hosted scripts).

If your workspace layout differs, update `PIPELINE_CONTRACT_PATH` to point at the contract file in `levante-support/schema_tools/PIPELINE_DATA_CONTRACT.json`.
