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
