# Cherrie Query Migration Evaluation

## Scope of changes completed
- Added backend callables for org/user/tasks/runs/assignments/administrations/legal queries.
- Wired roarfirekit wrappers and dashboard helpers behind `VITE_USE_BACKEND_MIGRATED_QUERIES`.
- Added minimal query validator tests in functions.

## Value assessment
- **Security**: Moving direct Firestore REST queries behind Cloud Functions reduces client-side exposure and centralizes permission checks.
- **Maintainability**: A single backend surface area for query logic reduces duplication between REST query builders and composables.
- **Performance**: Backend queries can return tailored data for cache updates, reducing full invalidations.

## Risks and gaps
- **Migration breadth**: Direct REST queries now route through backend for org/users/tasks/runs/assignments/administrations/legal when the feature flag is enabled.
- **Permission parity**: Some legacy adminOrg access paths may differ from new permission-system expectations and need audit.
- **Testing depth**: Added tests are minimal; emulator-backed integration tests for access control and data shape are still needed.

## Recommendation
- **Proceed** with a phased rollout using `VITE_USE_BACKEND_MIGRATED_QUERIES`.
- **Do not enable** the backend flag in production until:
  - Emulator integration tests validate access control for each migrated query.
  - Query parity comparisons confirm identical results between old and new paths.
  - Monitoring is in place for latency/error regressions.

## Next steps (suggested)
1. Add emulator-based tests for each callable with representative legacy data fixtures.
2. Run a controlled rollout: internal users → pilot site → full rollout.
